const https = require('https'),
      express = require('express'),
      app = express(),
      passport = require('passport'),
      session = require('express-session'),
      passportSteam = require('passport-steam'),
      SteamStrategy = passportSteam.Strategy,
      cookies = require("cookie-parser"),
      fs = require('fs'),
      jwt = require('jsonwebtoken'),
      cors = require('cors'),
      axios = require('axios'),
      serverCSGO = require('steam-server-query')
      mysql = require('mysql2'),
      crypto = require('crypto'),
      SteamID = require('steamid'),
      cheerio = require('cheerio'),
      pino = require('pino');

const config = require('./config.json');

const pool = mysql.createPool({
    host: "ip_db",
    user: "user_name",
    database: "name_database_lvl_rank",
    password: "password",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const ReactDB = mysql.createPool({
    host: "localhost",
    user: config.database_ReactDB.username,
    database: config.database_ReactDB.databaseName,
    password: config.database_ReactDB.password,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}); 

const query = (pool, sql, values) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, values, (error, results, fields) => {
            if (error) reject(error);
            resolve(results);
        });
    });
};

const transport = pino.transport({
    targets: [
        {
            target: 'pino-pretty',
            options: {
                destination: './logs/logs.log',
                mkdir: true,
                colorize: false,
                translateTime: 'UTC:dd-mm-yyyy HH:MM:ss'
            }
        },
        {
            target: 'pino-pretty',
            options: {
                destination: process.stdout.fd,
                tanslateTime: 'UTC:dd-mm-yyyy HH:MM:ss'
            }
        }
    ]
});

const logger = pino({
    level: 'info'
}, transport);


// Required to get data from user for sessions
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Initiate Strategy
passport.use(new SteamStrategy({
    returnURL: `https://${config.hostname}:${config.port}/auth/steam/return`,
    realm: `https://${config.hostname}:${config.port}/`,
    apiKey: config.apiKey
    }, async function (identifier, profile, done) {
        process.nextTick(function () {
            profile.identifier = identifier;

            const accessToken = jwt.sign(profile.id, config.secretKey);

            return done(null, {token: accessToken, profile: profile});
        });
    }
));

app.use(session({
    secret: config.secretKey,
    saveUninitialized: false,
    resave: false,
    proxy: false,
    httpOnly: false,
    cookie: {
        maxAge: 3600000
    }
}));

const server = https.createServer({
    key: fs.readFileSync("/etc/letsencrypt/live/madgs.ru/privkey.pem"), 
    cert: fs.readFileSync("/etc/letsencrypt/live/madgs.ru/cert.pem"),
}, app);


const io = require('socket.io')(server, {
    cors: {
        origin: [`https://${config.hostname}`], // Разрешите вашему клиенту на этом домене подключаться
        methods: ["GET", "POST"]
    }
});

let serversInfo = [];
let top10Players = [];
let TimePassed = true;
let TimePassedStats = true;

async function getDataServers(serversList) 
{
    serversInfo = [];

    for (let i = 0; i < serversList.length; i++) 
    {
        if (serversList[i].hidden) {
            const serverInfo = await serverCSGO.queryGameServerInfo(serversList[i].ip_port);
    
            let jsonServer = {
                ip: serversList[i].ip_port,
                name: (serversList[i].server_name) ? (serversList[i].server_name) : (serverInfo.name),
                map: serverInfo.map,
                players: Number(serverInfo.players),
                maxPlayers: Number(serverInfo.maxPlayers)
            };
            serversInfo.push(jsonServer);
            logger.info('Обновил список серверов');
        }
    }
}

async function getSteamAvatar(url_steam_profile) {
    try {
        const response = await axios.get(url_steam_profile, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        });
        const $ = cheerio.load(response.data);
        const avatar = $('.playerAvatarAutoSizeInner img')[1].attribs.src; // Измените селектор в соответствии с актуальной разметкой страницы
        if (avatar.search('.gif') != 1) {
            return avatar;
        }else{
            return false;
        }
    } catch (error) {
        logger.error('Произошла ошибка при получении аватара пользователя Steam:', error.message);
        return {status: "error", reason: `Произошла ошибка при получении аватара пользователя Steam: ${error.message}`};
    }
}

async function getTop10() {
    const sql = "SELECT `steam`, `rank`, `kills`, `deaths`, `headshots`, `value` FROM `lvl_base`ORDER BY `value` DESC LIMIT 10;";

    let top10 = await query(pool, sql);
    const arr = [];
    
    for (let i = 0; i < top10.length; i++) {
        let sid = new SteamID(top10[i].steam);

        const steamApiUrl = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${config.apiKey}&steamids=${sid.getSteamID64()}`;
        let steamProfile = await axios.get(steamApiUrl);

        steamProfile = steamProfile.data.response.players[0];

        let jsonStatsTop10 = {
            position: i,
            steamProfileURL: steamProfile.profileurl,
            steamNickName: steamProfile.personaname,
            avatarSrc: steamProfile.avatarfull,
            kills: top10[i].kills,
            deaths: top10[i].deaths,
            headshoot: top10[i].headshots,
            level: top10[i].rank,
            exp: top10[i].value,
            steamid64: steamProfile.steamid
        };
        arr.push(jsonStatsTop10);
    }
   top10Players = arr;
}

io.on('connection', async (sockets) => {
    console.log('Клиент подключился');

    if(TimePassed) 
    {
        TimePassed = false;

        let sql = "SELECT `id`, `ip_port`, `server_name`, `hidden` FROM `Servers`;";

        let servers = await query(ReactDB, sql);
        await getDataServers(servers); 
        setInterval(async () => {
            TimePassed = true;
        }, 180000);
    }

    sockets.on('disconnect', () => {
        console.log('Клиент отключился');
    });

    sockets.on('join_stats', async () => {
        sockets.join('stats');

        sockets.emit('get_stats', top10Players); // Работает

        if(TimePassedStats) 
        {
            TimePassed = false;
            await getTop10();
            setInterval(async () => {
                TimePassedStats = true;
            }, 300000);
        }
    });

    io.sockets.sockets.forEach((socket) => {
        // Отправка сообщения клиенту
        socket.emit('servers', serversInfo);
    });
});

app.use(passport.initialize());

app.use(express.json());

app.use(passport.session());

app.use(cookies());

// app.use(express.urlencoded({ extended: true }));

app.use(cors(
{
    origin: `https://${config.hostname}`,
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


async function authenticateToken(req, res, next) {
    const token = req.cookies.access_token;

    if (token == null) return res.redirect(`https://${config.hostname}`);

    jwt.verify(token, config.secretKey, async (err, steamid) => {
        if (err) return res.sendStatus(403);

        const steamApiUrl = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${config.apiKey}&steamids=${steamid}`;
        const response = await axios.get(steamApiUrl);

        req.session.user = response.data.response.players[0];
        next();
    });
}

app.get('/auth/steam', passport.authenticate('steam', {failureRedirect: '/'}),
(req, res) => {
    res.redirect('/');
});

app.get('/auth/steam/return', passport.authenticate('steam', {failureRedirect: '/'}),
async (req, res) => {
    // Сохранение данных пользователя в сессии
    req.session.user = req.user.profile;
    // Перенаправление на страницу, где будет выполнен POST-запрос
    let currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 1);

    sql = "INSERT INTO `Users` (`steamid`, `nickname`, `url_avatar`, `steam_profile_url`) VALUES (?, ?, ?, ?)";

    const profile = req.user.profile._json;

    const avatarGif = await getSteamAvatar(profile.profileurl);

    query(ReactDB, sql, [profile.steamid, profile.personaname, profile.avatar, profile.profileurl])
    .catch((err) => {
        if (err.code != "ER_DUP_ENTRY") {
            console.log(err);
            logger.error(err);
        }
        if (err.code == "ER_DUP_ENTRY") {
            query(ReactDB, "UPDATE `Users` SET `nickname`= ?, `url_avatar`= ?,`steam_profile_url`= ? WHERE `steamid` = ?", [profile.personaname, profile.avatar, profile.profileurl, profile.steamid])
        }
    });
    res.cookie('access_token', req.user.token, { domain: config.hostname, httpOnly: false, secure: true, expires: currentDate });
    res.redirect(`https://${config.hostname}`);
});

app.post('/get-user-data', authenticateToken, async (req, res) => {
    if (req.session.user) {
        res.json({ user: req.session.user, avatarGif: await getSteamAvatar(req.session.user.profileurl) });
    }
});

app.post('/stats', async (req, res) => {
    if (req.body.steamid) {
        const steamApiUrl = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${config.apiKey}&steamids=${req.body.steamid}`;
        let steamProfile = await axios.get(steamApiUrl);
        let sid;
        steamProfile = steamProfile.data.response.players[0];
    
        sid = new SteamID(req.body.steamid);

        const sql = "SELECT  `steam`, `rank`, `kills`, `deaths`, `headshots`, `value` FROM `lvl_base` WHERE `steam` = '" + sid.getSteam2RenderedID(true) + "';";

        const sql2 = "SELECT COUNT(*) + 1 AS relative_rank FROM `lvl_base` WHERE `value` > (SELECT `value` FROM `lvl_base` WHERE `steam` = '" +sid.getSteam2RenderedID(true)+ "');";

        let userStats = await query(pool, sql);
        let position = await query(pool, sql2);

        if (userStats[0] && position[0]) {
            userStats = userStats[0];
            position = position[0];

            const avatarGif = await getSteamAvatar(steamProfile.profileurl);

            let jsonStats = {
                position: position.relative_rank,
                steamProfileURL: steamProfile.profileurl,
                steamNickName: steamProfile.personaname,
                avatarSrc: avatarGif ? avatarGif : steamProfile.avatarfull,
                kills: userStats.kills,
                deaths: userStats.deaths,
                headshoot: userStats.headshots,
                level: userStats.rank,
                exp: userStats.value,
                steamid64: steamProfile.steamid
            };
        
            res.json({ stats: jsonStats });
        }else {
            res.json({ stats: null })
        }

    }
});



// Генерация подписи для Free-Kassa
function generateSignature(merchantId, price, orderId, secretWord) {
    return crypto.createHash('md5').update(`${merchantId}:${price}:${secretWord}:RUB:${orderId}`).digest('hex');
}

app.post('/create_payment', async (req, res) => {
    const { price, orderId, steamidUser , selectServer, steamUserName, expires } = req.body;

    // Параметры вашего магазина в Free-Kassa
    const merchantId = config.freekassa.merchantId;
    const secretWord = config.freekassa.secretKey_1;

    // Формирование подписи
    const signature = generateSignature(merchantId, price, orderId, secretWord);

    // Данные для запроса в Free-Kassa
    const paymentData = {
        m: merchantId,
        oa: price,
        o: orderId,
        s: signature,
        // Другие параметры, если необходимы
    };

    let sql = "SELECT `id`, `server_name` FROM `Servers` WHERE `server_name` = ?;";

    let server = await query(ReactDB, sql, [selectServer]);
    console.log(server);
    res.send(JSON.stringify({ type: 'redirect', url: `https://pay.freekassa.ru?m=${paymentData.m}&oa=${paymentData.oa}&currency=RUB&o=${paymentData.o}&s=${paymentData.s}&us_steamid=${steamidUser}&us_serverId=${server[0].id}&us_steamUserName=${steamUserName}&us_expires=${expires}` }));
});

function generateCheckSignature(params, secretWord) {
    const { MERCHANT_ID, AMOUNT, MERCHANT_ORDER_ID } = params;
    const hashString = `${MERCHANT_ID}:${AMOUNT}:${secretWord}:${MERCHANT_ORDER_ID}`;
    return crypto.createHash('md5').update(hashString).digest('hex');
}

app.get('/notification', async function (req, res) {
    const hbs = require('nodemailer-express-handlebars'),
    nodemailer = require('nodemailer'),
    path = require('path'),
    Rcon = require('rcon');

    const data = req.query;

    // Проверка подписи
    if (data.SIGN !== generateCheckSignature(data, config.freekassa.secretKey_2)) {
        res.json({status: 'error', reason: 'Неверная подпись'});
        return logger.error('Неверная подпись');
    }

    const orderId = data.MERCHANT_ORDER_ID;
    const amount = data.AMOUNT;
    const steamidUser = data.us_steamid;
    const serverId = data.us_serverId;
    let expires = data.us_expires;

    // expires.split(' ')[0] == 'Навсегда' ? 0 : Number(expires.split(' ')[0])

    let transporter = nodemailer.createTransport(
        {
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth:{
                user: config.mail.user,
                pass: config.mail.password_key
            }
        }
    )


    const handlerbarOptions = {
        viewEngine: {
            partialsDir: path.resolve('./emailTemplate/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./emailTemplate/'),
    }

    transporter.use('compile', hbs(handlerbarOptions))


    //TODO переделать выдачу привилегии под cs2 реализацию

    let sql = "SELECT `id`, `ip_port` FROM `Servers` WHERE `id` = ?";

    query(ReactDB, sql, [serverId]).then((server) => { 
        const conn = new Rcon(server[0].ip_port.split(':')[0], server[0].ip_port.split(':')[1], config.rcon_password);
        console.log(expires.split(' ')[0] == 'Навсегда' ? 0 : Number(expires.split(' ')[0]));
        const mailOptions = {
            from: `"Madness Project" <${config.mail.user}>`, // адрес отправителя
            template: "success_buy", // имя файла шаблона, например, email.handlebars.
            to: data.P_EMAIL,
            subject: 'Покупка привилегии на Madness Project',
            context: {
                nickname: data.us_steamUserName,
                key: 'Kv1QZW4j'
            },
        };
        try {
            transporter.sendMail(mailOptions).then((info) => {
                logger.info("письмо отправилось: %s", info.messageId);
            })
        } catch (error) {
            logger.error(`Ошибка Nodemailer при отправке электронной почты на `, error);
        }
        // conn.on('auth', function () {
        //     // Вы должны подождать, пока это событие не будет запущено, прежде чем отправлять какие-либо команды,
        //     // иначе эти команды завершится неудачно.
        //     logger.info("Authenticated");
        //     logger.info("Sending command: css_generatevip");
        //     // создать ключ - css_generatevip <время в днях> <группа: 0-виптест, 1-вип, 2-делюкс>
        //     conn.send(`css_generatevip ${expires.split(' ')[0] == 'Навсегда' ? 0 : Number(expires.split(' ')[0])} 1`);
        // }).on('response', function (str) {
        //     logger.info("Response: " + str);
            
        // }).on('error', function (err) {
        //     logger.error("Error: " + err);
        // }).on('end', function () {
        //     logger.warn("Connection closed");
        //     conn.connect();
        // });
    })
    

    //!выдача привилегии
    

    // css_activator
    // активировать випку - !activator <ключ из css_generatevip>


    res.json({status: 'OK'});
    console.log('OK');
});

app.get('/fail', (req, res) => {
   res.json({response: req.query});
});

server.listen(config.port, () => {
    console.log(`Listen server devapi.madgs.ru:${config.port}`);
});
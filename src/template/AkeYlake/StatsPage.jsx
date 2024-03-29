import React, { useEffect, useState } from 'react';
import io from 'socket.io-client'
import stats from './css/stats.module.css';
import DropMenuTemplate from './DropMenuTemplate.jsx';

function LevelIcon({level})
{
    let rankArray = [
        'skillgroup51',
        'skillgroup52',
        'skillgroup53',
        'skillgroup54',
        'skillgroup55',
        'skillgroup56',
        'skillgroup57',
        'skillgroup58',
        'skillgroup59',
        'skillgroup60',
        'skillgroup61',
        'skillgroup62',
        'skillgroup63',
        'skillgroup64',
        'skillgroup65',
        'skillgroup66',
        'skillgroup67',
        'skillgroup68'
    ]

    rankArray[-1] = 'skillgroup51';
    let imagesPath = `../../img/rank_icons_old/${(level >= rankArray.length) ? (rankArray[rankArray.length-1]) : (rankArray[level - 1])}.svg`


    return (
        <span className={stats.rankIcon}><img src={imagesPath}/></span>
    );
}
// {position, steamProfileURL, steamNickName, avatarSrc, kills, deaths, headshoot, level, exp}
function StatsPlayerRow({playerObject}) 
{   
    const {position, steamProfileURL, steamNickName, avatarSrc, kills, deaths, headshoot, level, exp} = playerObject;

    let headshootRate = Math.round((headshoot / kills) * 100);
    if(isNaN(headshootRate)) headshootRate = 0;

    let kdRate = (kills / deaths).toFixed(2);
    if(isNaN(kdRate)) kdRate = 0.0;

    let positionElement;
    let newPosition = (position <= 9) ? (position + 1) : (position);
    switch (newPosition)
    {
        case 1:
        {
            positionElement = <span className={stats.iconCup}><i className="fa-solid fa-crosshairs"></i></span>;
            break;
        }
        case 2:
        case 3:
        case 4:
        {
            positionElement = <span className={stats.iconCup}><i className="fa-solid fa-medal"></i></span>
            break;
        }
        default:
        {
            positionElement = <span className={stats.iconCup}>{newPosition}</span>;
        }
    }

    return (
        <div className={stats.statsPlayer} >
            <p>
                {positionElement}
            </p>
            <a className={stats.aAvatar} href={steamProfileURL}>
                <img className={stats.statsAvatar} src={avatarSrc} alt=""/>
                {steamNickName}
            </a>
            <p>
                {kills}
            </p>
            <p>
                {headshootRate}%
            </p>
            <p>
                {kdRate}
            </p>
            <p>
                <LevelIcon level={level}/>
            </p>
            <p>
                {exp}
            </p>
        </div>
    );
}

function StatsPage({userData}) 
{
    const [gettedPlayerInfo, setGettedPlayerInfo] = useState(false);
    const [playerListData, setPlayerListData] = useState([]);
    const [userPlayerRow, setUserPlayerRow] = useState(<></>);


    useEffect(() => {
        const socket = io(process.env.REACT_APP_API_URL_SOCKET);
        
        socket.on('connect', () => {
            socket.emit('join_stats', 'Привет, уебок на бекенде');
        });

        socket.on('get_stats', (playerList) => 
        {
            let PlayerFound = false;
            if(playerList)
            {
                let bufferyPlayerElement = [];
                playerList.forEach(elem => 
                {
                    // console.log(userData.steamid, elem.steamid64, userData.steamid == elem.steamID64);
                    if(userData && userData.steamid == elem.steamid64) 
                    {
                        PlayerFound = true;
                        bufferyPlayerElement.push(<StatsPlayerRow playerObject={elem}/>); // TODO: ДОДЕЛАТЬ ВЫДЕЛЕНИЕ ПОЛЬЗОВАТЕЛЯ
                    }
                    else bufferyPlayerElement.push(<StatsPlayerRow playerObject={elem}/>);
                });
                setPlayerListData(bufferyPlayerElement);
                if(PlayerFound == false) fetchToBackEnd()
            }
        });

        socket.on('disconnect', () => {
            console.log('Отключено от сервера');
        });

        socket.on("error", (error) => {
            console.error("Socket ERROR: ", error);
        });
    }, []);

    function fetchToBackEnd()
    {
        if(gettedPlayerInfo == true) return;
        if(!userData) return;

        fetch('/api/stats', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({steamid: userData.steamid}),
            credentials: 'include', // важно для отправки cookie с сессией
        }).then(res => res.json()).then(
            (result) => {
                if(result.stats) setUserPlayerRow(<StatsPlayerRow playerObject={result.stats}/>)
                setGettedPlayerInfo(true);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    return (
        <div className="second">
            <div className={stats.statsContainer}>
                <header>
                    <h1>Статистика Игроков</h1>
                    {/* <ChoiseServer /> */}
                </header>
                <div className={stats.playerList}>
                    <div className={stats.title}>
                        <p>
                            Позиция
                        </p>
                        <p>
                            Игрок
                        </p>
                        <p>
                            Убиства
                        </p>
                        <p>
                            HS%
                        </p>
                        <p>
                            K/D
                        </p>
                        <p>
                            Звание
                        </p>
                        <p>
                            Очки опыта
                        </p>
                    </div>
                    {playerListData}
                    {userPlayerRow}
                </div>
            </div>
        </div>
    );
}

function ChoiseServer() 
{
    const [selectServer, setSelectServer] = useState('Сервер');

    function callbackPointer(Event, title) 
    {
        switch(title)
        {
            case 'Only Mirage':
            {
                console.log("Only Mirage")
                break;
            }
            case 'AWP Development':
            {
                console.log("AWP Development")
                break;
            }
        }
        setSelectServer(title);
    }

    return (
        <div className={stats.choiseServer}>
            <div className={stats.choiseServerTitle}>
                <a>{selectServer}</a>
                <span className="icon-down"><i className="fa-solid fa-caret-down"></i></span>
            </div>
            <DropMenuTemplate itemList={[
            {
                "title":"Only Mirage"
            },
            {
                "title":"AWP Development"
            }
            ]} callbackPointer={callbackPointer} className={stats.headerStatsMenu}/>
        </div>
    );
}

export default StatsPage;
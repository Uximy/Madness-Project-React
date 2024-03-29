import React, { useEffect, useState } from 'react';
import io from 'socket.io-client'
import NotificationElement from './NotificationElement.jsx';
function MediaResource({ href, imgSrc, name }) {
    return (
        <li>
            <a className="button-media" href={href}>
                <img src={imgSrc} alt="" />
                <h3>{name}</h3>
            </a>
        </li>
    );
}

function MainAdministrator({ href, name, avatarSrc }) {
    return (
        <a target='_blank' className="main-administrator redAnimated" href={href}>
            <img src={avatarSrc}
                alt="" />
            <p>{name}</p>
            <span className="vk-icon"><i className="fa-brands fa-vk"></i></span>
        </a>
    );
}

function ServerItem({ title, imgSrc, altImages, online, maxPlayers, ip }) 
{
    let connectSrc = `steam://connect/${ip}`

    function OnClickCopyButton()
    {
        navigator.clipboard.writeText(ip);
    }

    return (
        <li className="server">
            <img src={imgSrc} alt={altImages} />
            <h2>{title}</h2>
            <p className="animated">Онлайн: <span className="online-players">{online}/{maxPlayers}</span></p>
            <p>
                <span className="copy-icon monitoring-icon animated" onClick={OnClickCopyButton}><i className="fa-solid fa-copy"></i></span>
                <span className="span-ip animated">{ip}</span>
                <a className="play-icon monitoring-icon animated" href={connectSrc}><i className="fa-solid fa-play"></i></a>
            </p>
        </li>
    );
}

function HomePage() 
{
    const [showCustomNotification, setShowCustomNotification] = useState(false);

    useEffect(() => {
        const paymentSuccess = localStorage.getItem('paymentSuccess');
        if (paymentSuccess === 'true') {
            setShowCustomNotification(true);
            // Удаление ключа paymentSuccess из localStorage
            localStorage.removeItem('paymentSuccess');
        }
    }, []);

    const [serverItemsListData, setServerItemsListData] = useState([]);
    useEffect(() => {
        const socket = io(process.env.REACT_APP_API_URL_SOCKET);

        socket.on('connect', () => {
            console.log('Подключено к серверу');
        });

        socket.on('servers', (arrServer) => 
        {
            if (arrServer)
            {
                let bufferyElement = [];
                arrServer.forEach(element => {
                    bufferyElement.push(<ServerItem title={element.name} imgSrc={"img/maps/" + element.map + ".webp"} altImages={element.map} online={element.players} maxPlayers={element.maxPlayers} ip={element.ip} />)
                });
                setServerItemsListData(bufferyElement);
            }
        });

        socket.on('disconnect', () => {
            console.log('Отключено от сервера');
        });

    }, []);


    // if (serverData) 
    return (
        <main>
            {showCustomNotification && (
                <NotificationElement
                    colorElement="#00BC00"
                    title="Оплата прошла успешно!"
                    message="Спасибо за покупку привилегии! Проверьте почту для получения кода активации."
                />
            )}
            
            <div className="container">
                <div className="first">
                    <div className="miniBlock">
                        <div className="monitoring">
                            {/* <h1>Наши сервера</h1> */}
                            <h1>Наш сервер</h1>
                            <ul>
                                {serverItemsListData}
                            </ul>
                        </div>
                        {/* <div className="steamVipAdvert">
                            <h2>Вступай в нашу группу <a href="https://steamcommunity.com/groups/MADNESSGS">Steam<span className="steamVipAdvertIcon"> <i class="fa-brands fa-square-steam"></i></span></a> и получай за это VIP!</h2>
                            <p>
                                Приемущество VIP смотри в <a href="/shop">Магазине</a>.
                            </p>
                        </div> */}
                        <div className="steamVipAdvert">
                            <h2>Открыта вакансия на администратора игровых серверов.</h2>
                            <p>
                                Основные требования к кандидатам:
                                <ul>
                                    <li>
                                        Возраст от 15 лет.
                                    </li>
                                    <li>
                                        Иметь хороший микрофон.
                                    </li>
                                    <li>
                                        Быть игроком проекта больше недели.
                                    </li>
                                    <li>
                                        Иметь частый онлайн.
                                    </li>
                                    <li>
                                        Знать все правила и наказания к ним.
                                    </li>
                                </ul>

                                Если ты подходишь по всем требованиям. <br />
                                Переходи в наш <a href="https://discord.gg/r6Ku2Fmq6Z">дискорд</a> и оставляй заявку.
                            </p>
                        </div>
                    </div>
                    <div className="miniBlock">
                        <div className="admin-list">
                            <h2>
                                Администрация проекта
                            </h2>
                            <MainAdministrator href="https://vk.com/madz1ra" name="Платон Сергеев" avatarSrc="https://sun86-2.userapi.com/s/v1/if2/36pH09OnMOa9vgypsbWJfJP6V2nCWs_zROK-pwGB1OxlsLYmCaTE-p99X2HNX4Ex7RrC7li-8VgCPwOvz-Bbni_j.jpg?quality=95&crop=239,229,925,925&as=50x50,100x100,200x200,400x400&ava=1&u=cEN1OoLIP3zYbq1eK8AyqVp_jGTeLe48xz1x9XCydF0&cs=50x50" />
                            {/* <MainAdministrator href="https://vk.com/id799348598" name="Владислав Горланов" avatarSrc="https://sun86-1.userapi.com/s/v1/if2/X7rsdl1_H04cAN9UxJbuH6aYxXDsYqmIwlS7LG6Ab8SS12gEizQVI1nSvjrNGXnWwG01VTWoolmNBtE64Xsq4S2m.jpg?quality=95&crop=0,0,659,659&as=50x50,100x100,200x200,400x400&ava=1&u=IW4ItZtYKCbIwP-EYajrfOw6R81OFTzEnN5Br7QkPrU&cs=200x200" /> */}
                        </div>
                        <div className="block-media">
                            <h2>Наши медийные ресурсы</h2>
                            <ul className="list-media">
                                <MediaResource href="https://discord.gg/r6Ku2Fmq6Z" imgSrc="img/maddiscord.jpg" name="Discord" />
                                <MediaResource href="https://vk.com/madnessgs" imgSrc="img/madnessvk.jpg" name="VK Group" />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default HomePage;
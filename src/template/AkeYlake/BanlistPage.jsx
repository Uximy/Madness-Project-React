import React, { useState } from "react";
import banlist from './css/banlist.module.css';
import DropMenuTemplate from './DropMenuTemplate.jsx';

function BanlistPage()
{
    return (
        <div className={banlist.BanlistPage}>
            <div className={banlist.BanlistContainer}>
                <header className={banlist.BanlistHeader}>
                    <h1>Список Блокировок</h1>
                    <button>
                        Расширенный поиск
                        <span className={banlist.ButtonIcon}><i class="fa-solid fa-magnifying-glass"></i></span>
                    </button>
                </header>
                <div className={banlist.banlistTable}>
                    <BanlistTableTitle />
                </div>
            </div>
        </div> 
    )
}

function BanlistTableTitle()
{
    return(
        <div className={banlist.banlistTablerowTitle}>
            <p>
                Сервер
            </p>
            <p>
                Дата
            </p>
            <p>
                Игрок
            </p>
            <p>
                Администратор
            </p>
            <p>
                Срок
            </p>
            <p>
                Тип Блокировоки
            </p>
        </div>
    )
}

/*
    player/administrator 
    {
        "nickname": "AkeYlake", // Ник игрока
        "avatarSrc": "https://avatars.akamai.steamstatic.com/1f475970026d2c099682f22502374b660e2727ab_full.jpg", // Ссылка на аватарку в стиме
        "steamProfileURL": "https://steamcommunity.com/id/AkeYlake/" // Ссылка на стим профиль
    }
*/

function BanlistTableRow({player, server, steamID, steamID64, administrator, data, dataOver, time, blocktype})
{
    // playerNickName, playerAvatarSrc, playerSteamUrl, administratorNickName, administratorAvatarSrc, administratorSteamURL

    const [extendedElement, setExtendedElement] = useState(null);

    function onClickExtended(Event)
    {
        if(extendedElement != null)
        {
            extendedElement = ExtendedRow({player, steamID, steamID64, data, dataOver, time, server, administrator, blocktype});
        }
        else extendedElement = null;
    }

    return(
        <>
        <div className={banlist.banlistTableRow} onClick={onClickExtended}>
            <p>
                {server}
            </p>
            <p>
                {data}
            </p>
            <a href={player.steamProfileURL}>
                <img src={player.avatarSrc} alt=""/>
                {player.nickname}
            </a>
            <a href={administrator.steamProfileURL}>
                <img src={administrator.avatarSrc} alt=""/>
                {administrator.nickname}
            </a>
            <p>
                {time}
            </p>
            <p>
                <IconTypeBlock blocktype={blocktype}/>
            </p>
        </div>
        {extendedElement}
        </>
    )
}

function ExtendedRow({player, steamID, steamID64, data, dataOver, time, server, administrator, blocktype})
{
    let status;
    // if(status)
    // {

    // }

    return (
        <div className={banlist.banlistExtendedRow}>
            <p className={banlist.banlistExtendedRowPtag}>
                <span className={banlist.ExtendedRowSpanMain}>
                    Игрок
                </span>
                <span className={banlist.ExtendedRowAdditionally}>
                    {player.nickname}
                </span>
            </p>
            <p className={banlist.banlistExtendedRowPtag}>
                <span className={banlist.ExtendedRowSpanMain}>
                    SteamID
                </span>
                <span className={banlist.ExtendedRowAdditionally}>
                    {steamID}
                </span>
            </p>
            <p className={banlist.banlistExtendedRowPtag}>
                <span className={banlist.ExtendedRowSpanMain}>
                    Steam Community
                </span>
                <a className={banlist.ExtendedRowAdditionally} href={player.steamProfileURL}>
                    {steamID64}
                </a>
            </p>
            <p className={banlist.banlistExtendedRowPtag}>
                <span className={banlist.ExtendedRowSpanMain}>
                    Дата
                </span>
                <span className={banlist.ExtendedRowAdditionally}>
                    {data}
                </span>
            </p>

            <p className={banlist.banlistExtendedRowPtag}>
                <span className={banlist.ExtendedRowSpanMain}>
                    Дата Окончания
                </span>
                <span className={banlist.ExtendedRowAdditionally}>
                    {dataOver}
                </span>
            </p>

            <p className={banlist.banlistExtendedRowPtag}>
                <span className={banlist.ExtendedRowSpanMain}>
                    Срок
                </span>
                <span className={banlist.ExtendedRowAdditionally}>
                    {time}
                </span>
            </p>
            
            <p className={banlist.banlistExtendedRowPtag}>
                <span className={banlist.ExtendedRowSpanMain}>
                    Сервер
                </span>
                <span className={banlist.ExtendedRowAdditionally}>
                    {server}
                </span>
            </p>

            <p className={banlist.banlistExtendedRowPtag}>
                <span className={banlist.ExtendedRowSpanMain}>
                    Статус
                </span>
                <span className={banlist.ExtendedRowAdditionally}>
                    {status}
                </span>
            </p>

            <p className={banlist.banlistExtendedRowPtag}>
                <span className={banlist.ExtendedRowSpanMain}>
                    Тип блокировки
                </span>
                <span className={banlist.ExtendedRowAdditionally}>
                    {blocktype}
                </span>
            </p>


            <p className={banlist.banlistExtendedRowPtag}>
                <span className={banlist.ExtendedRowSpanMain}>
                    Администратор
                </span>
                <a className={banlist.ExtendedRowAdditionally} href={administrator.steamProfileURL}>
                    {administrator.nickname}
                </a>
            </p>
        </div>
    );
}

function IconTypeBlock({blocktype})
{   
    let element;
    switch(blocktype)
    {
        case 'mute':
        {
            element = <span className={banlist.iconMute}><i class="fa-solid fa-microphone-slash"></i></span>
            break;
        }
        case 'ban':
        {
            element = <span className={banlist.iconBan}><i class="fa-solid fa-lock"></i></span>
            break;
        }
    }
    return ({element});
}

export default BanlistPage;
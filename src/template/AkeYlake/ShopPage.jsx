import React, { useState } from "react";
import shop from './css/shop.module.css';
import DescriptionPrivileges from './DescriptionPrivileges.jsx';

let ShopDictionary = require('./ShopDictionary.json');

let arrayTime = [ "7 дней", "30 дней", "90 дней", "Навсегда"];

function ShopMenuPaymentForm({userData, onChange}) 
{
    const [selectServer, setSelectServer] = useState('Сервер');
    const [selectPrivileges, setPrivileges] = useState('Привилегия');
    const [selectTime, setTime] = useState('Срок');
    const [price, setPrice] = useState(0);

    const [statePrivilegesItemList, setPrivilegesItemList] = useState([]);

    let ServerItemsList = [];

    for(let ServerName in ShopDictionary)
    {
        ServerItemsList.push(ServerName);
    }
    
    function callbackClickServer(Event)
    {
        Event.preventDefault();
        if(selectServer != Event.target.innerText)
        {
            setSelectServer(Event.target.innerText);
            setPrivileges('Привилегия');
            onChange('Привилегия');

            let privilegesItemList = [];
            ShopDictionary[Event.target.innerText].forEach((element) => 
            {
                privilegesItemList.push(element.name);
            });
            setPrivilegesItemList(privilegesItemList);
            setPrice(0);
        }
    }

    function callbackClickPrivileges(Event)
    {
        Event.preventDefault();
        if(selectPrivileges != Event.target.innerText)
        {
            setPrivileges(Event.target.innerText);
            onChange(Event.target.innerText);
            if(selectTime != 'Срок')
            {
                setPrice(ShopDictionary[selectServer].find(elem => elem.name == Event.target.innerText).Price[arrayTime.indexOf(selectTime)]);
            }
            else setPrice(0);
        }
    }

    function callbackClickTime(Event)
    {
        Event.preventDefault();
        if(selectTime != Event.target.innerText)
        {
            setTime(Event.target.innerText);
            if(selectPrivileges != 'Привилегия')
            {
                setPrice(ShopDictionary[selectServer].find(elem => elem.name == selectPrivileges).Price[arrayTime.indexOf(Event.target.innerText)]);
            }
            else setPrice(0);
        }
    }

    function clickBuyButton(Event) 
    {
        Event.preventDefault();
        if (userData == undefined) {
            window.location.href = "/api/auth/steam";
            return 0;
        }

        fetch("/api/create_payment", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({price: price, orderId: selectPrivileges, selectServer: selectServer, steamidUser: userData.steamid, steamUserName: userData.personaname, expires: selectTime})
        }).then(res => res.json()).then(
            (result) => {
                if (result.type == 'redirect') {
                    console.log(result);
                    window.location.href = result.url;
                }

                if(result.status == 'error'){
                    console.error(result.reason);
                }
            },
            (error) => {
                console.log(error);
            }
        )
        //TODO: Оплата и обработка на беке начинается тут.
        console.log(selectServer, selectPrivileges, selectTime, price);
    }

    return (
        <form id={shop.paymentForm} className={shop.paymentForm}>
            <DropDownShopMenu title={selectServer} callbackClick={callbackClickServer} itemList={ServerItemsList}/>
            <DropDownShopMenu title={selectPrivileges} callbackClick={callbackClickPrivileges} itemList={statePrivilegesItemList}/>
            <DropDownShopMenu title={selectTime} callbackClick={callbackClickTime} itemList={arrayTime}/>

            <p className={shop.pAmount}>
                Цена <span className={shop.amount}>{price}</span>
                <span className="icon-down"><i className="fa-solid fa-ruble-sign"></i></span>
            </p>
            <button /*id="buyShop" title="Оплатить покупку!"*/ onClick={clickBuyButton}>
                <p>
                    КУПИТЬ
                    <span className="icon-down"><i className="fa-solid fa-credit-card"></i></span>
                </p>
            </button>
        </form>
    );
}

function DropDownShopMenu({title, itemList, callbackClick}) 
{
    let itemListElements = [];

    if(itemList != null && itemList.length > 0)
    {
        itemList.forEach(element => {
            itemListElements.push(<DropDownMenuPoint title={element}/>);
        });
    }

    return(
        <ul className={shop.ShopDropDownMenu}>
            <li>
                <a>{title}
                <span className="icon-down"><i className="fa-solid fa-caret-down"></i></span>
                </a>
                
                <ul onClick={callbackClick}>
                    {itemListElements}
                </ul>
            </li>
        </ul>
    );
}

function ShopPage({userData}) 
{
    const [statePrivilegesName, setPrivilegesName] = useState("");
    
    function changeDiscription(privileges)
    {
        setPrivilegesName(privileges);
    }
    
    return (
        <main>
            <div className={shop.info}>
                <div className={shop.messageStrip}></div>
                При оплате вводите свою личную почту, так как на него отправится код активации привилегии!<br/><br/>Администрация <b>Madness Projects</b> не несёт отвествености если вы ввели неверную почту или за вашу криворукость.
            </div>

        <div className="first">
            <div className={shop.contentShop}>
                <h1 className={shop.h1_shop}>Магазин</h1>
                <div className={shop.shopContainer}>
                    <ShopMenuPaymentForm userData={userData} onChange={changeDiscription}/>
                </div>
            </div>
            <PrivilegesDescription privilegesName={statePrivilegesName}/>
        </div>            
        </main>
    );
}


function PrivilegesDescription({privilegesName})
{
    return (
        <div className={shop.privilegesDescription}>
            <h2 className={shop.h2_shop}>
                Описание выбранной привилегии
            </h2>
            <p>
                <DescriptionPrivileges privilegesName={privilegesName}/>
            </p>
        </div>
    );
}

function DropDownMenuPoint({title})
{
    return(
        <li><a href="#">{title}</a></li>
    );
}

export default ShopPage;
import { useCookies } from 'react-cookie';
import DropMenuTemplate from './DropMenuTemplate.jsx';
// process.env.DOMAIN_NAME // dev.madgs.ru
function Header({userData, callBackDeleteUserData}) {
    return (
        <nav className="header">
            <ul>
                <HeaderLogo />
                <MobileHeaderLi href={`https://${process.env.REACT_APP_DOMAIN_NAME}/`} icon="fa-solid fa-house" />
                <HeaderLi href="/shop" name="Магазин" />
                <MobileHeaderLi href="/shop" icon="fa-solid fa-cart-shopping" />
                <HeaderLi href="https://skins.madgs.online/" name="Выбор скинов" />
                <MobileHeaderLi href="https://skins.madgs.online/" icon="fa-solid fa-gun" />
                <HeaderLi href="/stats" name="Статистика" />
                <MobileHeaderLi href="/stats" icon="fa-solid fa-trophy" />
                <HeaderLi href="/rules" name="Правила" />
                <MobileHeaderLi href="/rules" icon="fa-solid fa-book-bible" />
                <HeaderLi href="/news" name="Новости" />
                <MobileHeaderLi href="/news" icon="fa-regular fa-newspaper" />
                <Profile userData={userData}/>
            </ul>
        </nav>
    );
}

// shop - "fa-solid fa-cart-shopping"

function MobileHeaderLi({href, icon}) {
    return(
        <li className="header-mobile-li">
            <a href={href}><i className={icon}></i></a>
        </li>
    );
}

function HeaderLogo() {
    return (
        <li className="header-li">
            <a href={`https://${process.env.REACT_APP_DOMAIN_NAME}/`} className="a-logo">
                <img src="../../img/logo_madness.jpg"
                    type="logo" alt="Логотип проекта" width="200" height="60" />
            </a>
        </li>
    );
}

function HeaderLi({ href, name }) {
    return (
        <li className="header-li">
            <a href={href}>{name}</a>
        </li>
    );
}

function Profile({userData}) 
{
    const [cookie, setCookie, removeCookie] = useCookies(['access_token']);

    function callbackPointer(Event, title) 
    {
        switch(title)
        {
            case 'Профиль':
            {
                console.log("Переадресация на профиль")
                break;
            }
            case 'переход на prod':
            {
                window.location.href = 'https://madgs.ru/';
                break;
            }
            case 'Выйти':
            {
                removeCookie('access_token_dev', {
                    path: "/",
                    domain: `.${process.env.REACT_APP_DOMAIN_NAME}`
                })
                removeCookie('access_token', {
                    path: "/",
                    domain: `.${process.env.REACT_APP_DOMAIN_NAME}`
                })
                window.location.reload(false);
                break;
            }
        }
    }

    let element;

    if (userData) 
    {
        element = <div className="userSteamProfileWrapper"><div className="user-steam-profile">
        <span className="user-steam-avatar"><img src={userData.avatar} width="35px" height="35px" alt="Steam Аватар" /></span>
        <span className="user-steam-name">{userData.personaname}</span>
        <span className="user-steam-icon-down"><i className="fa-solid fa-caret-down"></i></span>
        </div>
        <DropMenuTemplate itemList={[
            // {
            //     "title":"Профиль"
            // },
            {
                "title": "переход на prod"
            },
            {
                "title":"Выйти"
            }
        ]} callbackPointer={callbackPointer} className="headerProfileMenu"/>
        </div>
    } else {
        element = <div><a href="/api/auth/steam" className="authorization">
        <span className="steam-icon"><i className="fa-brands fa-steam-symbol"></i></span>
        <span className="text">Войти через Steam</span></a></div>
    }

    return (
        <li className="header-li">
            {element}
        </li>
    );
}

export default Header;

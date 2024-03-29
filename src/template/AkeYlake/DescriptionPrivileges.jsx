import shop from './css/shop.module.css';

function DescriptionPrivileges({privilegesName})
{
    let element;
    switch(privilegesName)
    {
        case 'BHOP':
        {
            element = <DescriptionBHOP />
            break;
        }
        case 'VIP':
        {
            element = <DescriptionVIP />
            break;
        }
        case 'PREMIUM':
        {
            element = <DescriptionPREMIUM />
            break;
        }
        case 'DELUXE':
        {
            element = <DescriptionDELUXE />
            break;
        }
        case 'PRIVILEGES 1':
        {
            element = <DescriptionTEST1 />
            break;
        }
        case 'PRIVILEGES 2':
        {
            element = <DescriptionTEST2 />
            break;
        }
        default:
        {
            element = 'Для того, увидеть описание привилегии, выберете её.'
        }
    }
    return (
        <>
            {element}
        </>
    );
}

function DescriptionTEST1()
{
    return (
        <>
            <span className={shop.privilegesPoint}>Строка <span className={shop.akcent}>ТЕСТА 1</span></span><br/>
        </>
    );
}

function DescriptionTEST2()
{
    return (
        <>
            <span className={shop.privilegesPoint}>Строка <span className={shop.akcent}>ТЕСТА 2</span></span><br/>
        </>
    );
}

function DescriptionBHOP()
{
    return (
        <>
            <span className={shop.privilegesPoint}>Выбор <span className={shop.akcent}>монеты</span></span><br/>
            <span className={shop.privilegesPoint}>Набор <span className={shop.akcent}>обезвреживания</span></span><br/>
            <span className={shop.privilegesPoint}><span className={shop.akcent}>Исчезание тела</span> после смерти</span><br/>
            <span className={shop.privilegesPoint}><span className={shop.akcent}>Трассера</span> от гранат</span><br/>
            <span className={shop.privilegesPoint}><span className={shop.akcent}>Нет урона</span> от падения</span><br/>
            <span className={shop.privilegesPoint}>Бхоп спустя <span className={shop.akcent}>10</span> секунд</span><br/>
            <span className={shop.privilegesPoint}>Увеличенное здоровье до <span className={shop.akcent}>101</span></span><br/>
            <span className={shop.privilegesPoint}>Увеличенная броня до <span className={shop.akcent}>101</span></span><br/>
            <span className={shop.privilegesPoint}>Дополнительные деньги <span className={shop.akcent}>+500</span></span><br/>
            <span className={shop.privilegesPoint}>Тег в табе <span className={shop.akcent}>BHOP</span></span><br/>
            <span className={shop.privilegesPoint}>Префикс в чате <span className={shop.akcent}>BHOP</span></span>
        </>
    );
}

function DescriptionVIP()
{
    return (
        <>
            <span className={shop.privilegesPoint}><span className={shop.akcent}>Отображение</span> урона</span><br />
            <span className={shop.privilegesPoint}>Командный <span className={shop.akcent}>антифлеш</span></span><br />
            <span className={shop.privilegesPoint}><span className={shop.akcent}>Неоновая</span> подсветка</span><br />
            <span className={shop.privilegesPoint}><span className={shop.akcent}>Эффект</span> при спауне</span><br />
            <span className={shop.privilegesPoint}>Выбор набора <span className={shop.akcent}>музыки</span></span><br />
            <span className={shop.privilegesPoint}><span className={shop.akcent}>Нет урона</span> от себя</span><br />
            <span className={shop.privilegesPoint}>Увеличенное здоровье до <span className={shop.akcent}>102</span></span><br />
            <span className={shop.privilegesPoint}>Увеличенная броня до<span className={shop.akcent}>102</span></span><br />
            <span className={shop.privilegesPoint}>Дополнительные деньги <span className={shop.akcent}>+750</span></span><br />
            <span className={shop.privilegesPoint}>Медшприц <span className={shop.akcent}>+1</span></span><br />
            <span className={shop.privilegesPoint}>Увеличенная скорость передвижения<span className={shop.akcent}>1.02</span></span><br />
            <span className={shop.privilegesPoint}>Метательные ножи <span className={shop.akcent}>5</span></span><br />
            <span className={shop.privilegesPoint}>Тег в табе <span className={shop.akcent}>VIP</span></span><br />
            <span className={shop.privilegesPoint}>Префикс в чате <span className={shop.akcent}>VIP</span></span><br /><br />
            <span className={shop.privilegesPoint}>Включает в себя возможности <span className={shop.akcent}>BHOP</span></span>
        </>
    );
}

function DescriptionPREMIUM()
{
    return (
        <>
            <span className={shop.privilegesPoint}><span className={shop.akcent}>Сообщение</span> при заходе на сервер</span><br />
            <span className={shop.privilegesPoint}>Выбор <span className={shop.akcent}>skybox</span></span><br />
            <span className={shop.privilegesPoint}>Хитмаркер</span><br />
            <span className={shop.privilegesPoint}><span className={shop.akcent}>Разноцветный</span> антифлеш</span><br />
            <span className={shop.privilegesPoint}><span className={shop.akcent}>Эффект</span> убийства</span><br />
            <span className={shop.privilegesPoint}>Бхоп спустя <span className={shop.akcent}>7</span> секунд</span><br />
            <span className={shop.privilegesPoint}>Увеличенное здоровье до <span className={shop.akcent}>103</span></span><br />
            <span className={shop.privilegesPoint}>Увеличенная броня до <span className={shop.akcent}>103</span></span><br />
            <span className={shop.privilegesPoint}>Дополнительные деньги <span className={shop.akcent}>+2000</span></span><br />
            <span className={shop.privilegesPoint}>Медшприц <span className={shop.akcent}>+2</span></span><br />
            <span className={shop.privilegesPoint}>Увеличенная скорость передвижения <span className={shop.akcent}>1.05</span></span><br />
            <span className={shop.privilegesPoint}>Метательные ножи <span className={shop.akcent}>10</span></span><br />
            <span className={shop.privilegesPoint}>Тег в таблице счета <span className={shop.akcent}>PREMIUM</span></span><br />
            <span className={shop.privilegesPoint}>Стандартный префикс в чате <span className={shop.akcent}>PREMIUM</span></span><br />
            <span className={shop.privilegesPoint}>Установка <span className={shop.akcent}>любого префикса</span> в чате</span><br /><br />
            <span className={shop.privilegesPoint}>Включает в себя возможности <span className={shop.akcent}>BHOP, VIP</span></span>
        </>
    );
}

function DescriptionDELUXE()
{
    return (
        <>
            <span className={shop.privilegesPoint}>Выбор<span className={shop.akcent}> питомца</span></span><br />
            <span className={shop.privilegesPoint}>Возможность <span className={shop.akcent}>воскреснуть</span> 1 раз</span><br />
            <span className={shop.privilegesPoint}>Настройка <span className={shop.akcent}>поле зрения</span></span><br />
            <span className={shop.privilegesPoint}>Бхоп спустя <span className={shop.akcent}>5</span> секунд</span><br />
            <span className={shop.privilegesPoint}>Увеличенное здоровье до <span className={shop.akcent}>104</span></span><br />
            <span className={shop.privilegesPoint}>Увеличенная броня до <span className={shop.akcent}>104</span></span><br />
            <span className={shop.privilegesPoint}>Дополнительные деньги <span className={shop.akcent}>+5500</span></span><br />
            <span className={shop.privilegesPoint}>Медшприц <span className={shop.akcent}>+3</span></span><br />
            <span className={shop.privilegesPoint}>Увеличенная скорость передвижения <span className={shop.akcent}>1.1</span></span><br />
            <span className={shop.privilegesPoint}>Метательные ножи <span className={shop.akcent}>20</span></span><br />
            <span className={shop.privilegesPoint}>Тег в таблице счета <span className={shop.akcent}>DELUXE</span></span><br />
            <span className={shop.privilegesPoint}>Стандартный префикс в чате <span className={shop.akcent}>DELUXE</span></span><br />
            <span className={shop.privilegesPoint}>Установка <span className={shop.akcent}>любого префикса</span> в чате</span><br /><br />
            <span className={shop.privilegesPoint}>Включает в себя возможности <span className={shop.akcent}>BHOP, VIP, PREMIUM</span></span>
        </>
    );
}

export default DescriptionPrivileges;
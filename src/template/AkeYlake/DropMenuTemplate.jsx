/*
    itemList = [
        {
            title = "Содержание пункта"
            iconSpanWrap = "Класс span иконки, если имеется"
            iconClass = "Класс иконки, если имеется"
            callbackPointer = "callback функция в хедер"
        }
    ]
*/

function DropMenuTemplate({itemList, callbackPointer, className}) 
{
    let itemListElements = [];

    if(itemList != null && itemList.length > 0)
    {
        itemList.forEach(element => {
            itemListElements.push(<DropMenuTemplatePoint title={element.title} iconClass={element.iconClass} callbackPointer={callbackPointer}/>);
        });
    }

    return(         
        <ul className={className}>
            {itemListElements}
        </ul>
    );
}

function DropMenuTemplatePoint({title, iconSpanWrap, iconClass, callbackPointer}) {
    let icon;
    if(iconClass != undefined)
    {
        icon = <span className={iconSpanWrap}><i className={iconClass}></i></span>
    }

    function clickTitle(Event) 
    {
        if(callbackPointer != undefined) callbackPointer(Event, title);
    };

    return (
        <li onClick={clickTitle}><a>{title}{icon}</a></li>
    );
}

export default DropMenuTemplate;

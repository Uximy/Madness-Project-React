import React, { useEffect, useState } from "react";
import notification from './css/notification.module.css';

function NotificationElement({ colorElement, title, message }) {
    const [stateClassNameList, setClassNameList] = useState(notification.messageDiv);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setClassNameList(notification.messageDiv + " " + notification.start)
        }, 1);

        return () => clearTimeout(timeoutId);
    }, []);

    function OnClickButton(Event) {
        setClassNameList(notification.messageDiv + " " + notification.end)
    }

    return (
        <div className={stateClassNameList} style={{ boxShadow: `0px 0px 5px 5px ${colorElement}05` }}>
            <div className={notification.messageStrip} style={{ backgroundColor: colorElement }}></div>
            <div>
                <div className={notification.wrapper}>
                    <h3 style={{ color: colorElement }}>
                        {title}
                    </h3>
                    <button onClick={OnClickButton}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <p>
                    {message}
                </p>
            </div>
        </div>
    );
}

export default NotificationElement;

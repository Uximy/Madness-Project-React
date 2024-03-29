import React, { useEffect, useState } from 'react';

const HoverImageLink = ({ staticSrc, gifSrc, children }) => {
    const [isHovered, setIsHovered] = useState(false);
  
    return (
        <a href="https://sdkcs.ru/" target='_blank' onMouseEnter={() => setIsHovered(true)}onMouseLeave={() => setIsHovered(false)}>
            <span>
            <img className='logo_sdk' src={isHovered ? gifSrc : staticSrc} alt="SDK-LOGO" title="Перейти на сайт SDK Dev Team" />
            {children}
            </span>
        </a>
    );
  };

function Footer() {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
      // Получение текущего года при монтировании компонента
      const updateYear = () => {
        setCurrentYear(new Date().getFullYear());
      };
      
      // Вызываем функцию обновления при монтировании компонента
      updateYear();
    }, []); // пустой массив зависимостей означает, что эффект выполнится только при монтировании/размонтировании компонента

    return (    
    <footer>
        <div className="copyright">
            <p><span><i className="fa-regular fa-copyright"></i></span> Madness-Project, {currentYear} created by <HoverImageLink staticSrc="img/sdk_logo_transparent_white.png" gifSrc="img/sdk_logo_transparent_white.gif">SDK Dev Team</HoverImageLink></p>
            <div className="policy">
                <a href="" className="animated">Политика конфидециальности</a>
                <a href="" className="animated">Пользовательское соглашение</a>

                
                <a href="https://freekassa.ru" target="_blank" rel="noopener noreferrer">
                    <img src="https://cdn.freekassa.ru/banners/big-dark-1.png" title="Прием платежей" alt="Freekassa Банер"/>
                </a>
            </div>

        </div>
    </footer>
    );
}

export default Footer;
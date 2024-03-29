import React, { useEffect } from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import HomePage from './template/AkeYlake/HomePage';
import Header from './template/AkeYlake/Header';
import Footer from './template/AkeYlake/Footer';
import RulesPage from './template/AkeYlake/RulesPage';
import ShopPage from './template/AkeYlake/ShopPage';
import NotFoundPage from './template/AkeYlake/NotFoundPage';
import SuccessPage from './template/AkeYlake/freekassaPages/SuccessPage';
import FailPage from './template/AkeYlake/freekassaPages/FailPage';
import StatsPage from './template/AkeYlake/StatsPage';
import NewsPage from './template/AkeYlake/NewsPage';
import BanlistPage from './template/AkeYlake/BanlistPage';
import reportWebVitals from './reportWebVitals';
import NotificationElement from './template/AkeYlake/NotificationElement.jsx'; // Импорт элемента
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

let userData = null;
let bufferyRoute = [];
console.log(process.env);
const root = ReactDOM.createRoot(document.getElementById('root'));
// ${process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_DEVELOPMENT : process.env.REACT_APP_API_URL}

await fetch('/api/get-user-data', {
    method: 'POST',
    credentials: 'include', // важно для отправки cookie с сессией
  }).then(response => response.json())
  .then(data => {
    if (data.user) {
      const User = {
        steamid: data.user.steamid,
        avatar: data.avatarGif ? data.avatarGif : data.user.avatar,
        personaname: data.user.personaname
      }
      userData = User;
    }
  }).catch((err2) => {
    console.log('Error:', err2);
  })


bufferyRoute = [];

[{
  path: "/",
  content: <HomePage />
},
{
  path: "ban-list",
  content: <BanlistPage />
},
{
  path: "rules",
  content: <RulesPage />
},
{
  path: "stats",
  content: <StatsPage userData={userData}/>
},
{
  path: "shop",
  content: <ShopPage userData={userData} />
},
{
  path: "news",
  content: <NewsPage userData={userData} />
},].forEach(element => {
  bufferyRoute.push(
    <Route path={element.path} element={
      <>
        <CookiesProvider>
          <Header userData={userData}/>
            {/* <NotificationElement colorElement="#ff0000" title="Внимание!" message="Сайт находиться в разработке. О прогрессе можно узнать у Платона. Спасибо за внимание."/> */}
            {element.content}
          <Footer />
        </CookiesProvider>
      </>
    } exact />
  );
});


root.render(
  <BrowserRouter>
    <Routes>
      {bufferyRoute}
      <Route path="*" element={<NotFoundPage />} />
      <Route path="success" element={<SuccessPage />} />
      <Route path="fail" element={<FailPage />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals(console.log);
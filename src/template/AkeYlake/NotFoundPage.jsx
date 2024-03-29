// import "./css/NotFoundPageStyle.css";
import NotFoundPageStyle from './css/NotFoundPageStyle.module.css';

const NotFoundPage = () => {
    return(
        <body className={NotFoundPageStyle.body}>
            <section className={NotFoundPageStyle.notFound}>
                <div className={NotFoundPageStyle.img}>
                <img src="https://assets.codepen.io/5647096/backToTheHomepage.png" alt="Back to the Homepage"/>
                <img src="https://assets.codepen.io/5647096/Delorean.png" alt="El Delorean, El Doc y Marti McFly"/>
                </div>
                <div className={NotFoundPageStyle.text}>
                <h1>404</h1>
                <h2>PAGE NOT FOUND</h2>
                <a href="/" className={NotFoundPageStyle.back}>BACK TO HOME</a>
                </div>
            </section>
        </body>
    );
}

export default NotFoundPage;
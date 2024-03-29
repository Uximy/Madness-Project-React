import news from './css/news.module.css';

function NewsPublication({title, imgSrc, imgAlt = "photo", textContent, data, signature})
{
    let imgTag;
    if(imgSrc != null)
    {
        imgTag = <img src={imgSrc} alt={imgAlt} />;
    }

    let dicription = [];
    
    if(signature != null)
    {
        dicription.push(<div className={news.signature}>{signature}</div>); 
    }
    
    if(data != null)
    {
        dicription.push(<div className={news.data}>{data}</div>); 
    }


    return (
        <div className={news.main_content}>
            <h2>
                {title}
            </h2>
            {imgTag}
            <div className={news.text_content}>
                <p>{textContent}</p>
            </div> 

            <div className={news.dicription}>
                {dicription}
            </div>
        </div>
    )
}

function NewsPage({UserData}) 
{
    return (
        <section className={news.content}>
            <NewsPublication title="ТестЕбучий" imgSrc="img/news/favicon.png" signature="AkeYlake" data="21.12.2077" textContent="Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба Абоба "/>
            <NewsPublication title="ТестЕбучий" textContent="ТестЕбучий"/>
            <NewsPublication title="ТестЕбучий" textContent="ТестЕбучий"/>
            <NewsPublication title="ТестЕбучий" textContent="ТестЕбучий"/>
        </section>
    );
}

export default NewsPage;
import React from 'react';
import * as Helpers from './helpers';

const List = (props) => {
    const articles = props.list.map((item, i) => (
            <div className="article" key={i}>
                <div className="article-image">
                    <img src={item.urlToImage} alt={item.title}/>
                </div>
                <div className="article-content">
                    <a href={item.url} target="_blank"><h4>{item.title}</h4></a>
                    <div className="article-meta">
                        <div className="article-author"> By <i>{item.author}</i></div>
                        <div className="article-date">{Helpers.formatDate(item.publishedAt)}</div>
                    </div>
                    <p>{item.description}</p>
                </div>
            </div>
        ));
    return <div className="articlesContainer">{articles}</div>
}

export default List;
import React from 'react';
import * as Helpers from './helpers';
import './Search.css';

const List = (props) => {
    const articles = props.list.map((item, i) => (
            <div className="article" key={i}>
                <div className="article-image">
                    <img src={item.urlToImage} alt={item.title}/>
                    {item.source.name &&
                    <div className="article-source"><i>{item.source.name}</i>  </div>
                    }
                </div>
                <div className="article-content">
                    <a href={item.url} target="_blank"><h4>{item.title}</h4></a>
                    <div className="article-meta">
                        {item.author &&
                        <div className="article-author">
                            By <i>{item.author}</i></div>
                        }
                        {item.publishedAt &&
                        <div className="article-date"> |  {Helpers.formatDate(item.publishedAt)}</div>
                            }
                    </div>
                    <p>{item.description}</p>
                </div>
            </div>
        ));
    return <div className={"articlesContainer, " + props.className}>{articles}</div>
}

export default List;
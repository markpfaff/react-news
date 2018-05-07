import React, { Component } from 'react'
import axios from 'axios'
//import Suggestions from './Suggestions'


const applyUpdateResult = (result) => (prevState) => ({
    hits: [...prevState.hits, ...result.hits],
    page: result.page,
});

const applySetResult = (result) => (prevState) => ({
    hits: result.hits,
    page: result.page,
});



const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

const getNews = (value, page) =>
    `https://newsapi.org/v2/everything?q=${value}&page=${page}&apiKey=${API_KEY}`;


class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            page: null
        };
    }

    onInitialSearch = (e) => {
        e.preventDefault();

        const { value } = this.input;

        if (value === '') {
            return;
        }

        this.fetchStories(value, 1);
    }

    fetchStories = (value, page) => {
        axios.get(getNews(value, page))
            .then(res => {
                //console.log("data beforeis ", this.state.data);

                this.setState({data: res.data.articles});
                //console.log("data is ", this.state.data);
                //console.log("data is set to", res.data.articles);

            })
            //.then(result => this.onSetResult(result, page))
            .catch((error) => {
                // Error
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    // console.log(error.response.data);
                    console.log("response error code is ", error.response.status);
                    // console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log("request error code is ", error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("request setup error code is ", error.message);
                }
                console.log("general error code is ", error.config);
            })
    }

    onSetResult = (result, page) =>
        page === 1
            ? this.setState(applySetResult(result))
            : this.setState(applyUpdateResult(result));

    render() {
        return (
            <div className="page">
                <div className="interactions">
                    <form type="submit" onSubmit={this.onInitialSearch}>
                        <input type="text" ref={node => this.input = node} />
                        <button type="submit">Search</button>
                    </form>
                </div>

                <List
                    list={this.state.data}

                />
            </div>
        );
    }
}


const List = ({ list }) =>
    <div className="list">
        {list.map(item =>
            <div className="list-row" key={item.index}>
                <a href={item.url}>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                    <img src={item.urlToImage} alt={item.title}/>
                </a>
            </div>
        )}
    </div>

export default Search
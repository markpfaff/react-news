import React, { Component } from 'react'
import axios from 'axios'
import List from './List'


const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

const getNews = (value, page, fetchDomains) =>
    (typeof fetchDomains === "undefined"
        ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(value)}&sortBy=publishedAt=&page=${page}&apiKey=${API_KEY}`
        : `https://newsapi.org/v2/everything?q=${encodeURIComponent(value)}&domains=${fetchDomains}&sortBy=publishedAt=&page=${page}&apiKey=${API_KEY}`);

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            page: null,
            isLoading: false,
            inputValue: '',
            domains:'',
        };
    }

    onInitialSearch = (e) => {
        e.preventDefault();
        const { value } = this.input;

        this.setState({ inputValue : value});

        if (value === '') {
            return;
        }

        this.fetchStories(value, 1 );
    }

    fetchStories = (value, page, fetchDomains) => {
        axios.get(getNews(value, page, fetchDomains))
            .then(response => {
                this.setState({data: response.data.articles});
            })
    }

    render() {
        return (
                <div className="page">
                    <div className="App-search">
                        <form type="submit" onSubmit={this.onInitialSearch}>
                            <input type="text" ref={node => this.input = node} />
                            <button type="submit">Search</button>
                        </form>
                    </div>
                    <div>
                        <List list={this.state.data} />
                     </div>
                </div>
        );
    }
}

export default Search
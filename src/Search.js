import React, { Component } from 'react'
import axios from 'axios'
import List from './List'

//import Suggestions from './Suggestions'


const applyUpdateResult = (response) => (prevState) => ({
    data: [...prevState.data, ...response.data.articles],
    isLoading: false,
});

const applySetResult = (response) => (prevState) => ({
    data: response.data.articles,
    isLoading: false,
});


const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

const getNews = (value, page) =>
    `https://newsapi.org/v2/everything?q=${value}&sortBy=publishedAt=&page=${page}&apiKey=${API_KEY}`;

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            page: null,
            isLoading: false,
        };
    }

    onInitialSearch = (e) => {
        e.preventDefault();

        const { value } = this.input;

        if (value === '') {
            return;
        }

        this.fetchStories(value, 1 );
    }

    onPaginatedSearch = (e) =>
        this.fetchStories(this.input.value, this.state.page + 1);

    fetchStories = (value, page) => {
        this.setState({ isLoading: true });
        this.setState({ page: page});
        axios.get(getNews(value, page))
            .then(response => {
                //console.log("data before is ", this.state.data);

                this.setState({data: response.data.articles});
                //console.log("data is ", this.state.data);
                //console.log("data is set to", res.data.articles);
                this.onSetResult(response, page);
                console.log("api call is ", getNews(value, page));
                console.log("this.state.page inside is ", this.state.page);
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

    onSetResult = (response, page) =>
        page === 1
            ? this.setState(applySetResult(response))
            : this.setState(applyUpdateResult(response));

    render() {
        return (
            <div className="page">
                <div className="App-search">
                    <form type="submit" onSubmit={this.onInitialSearch}>
                        <input type="text" ref={node => this.input = node} />
                        <button type="submit">Search</button>
                    </form>
                </div>

                <List
                    list={this.state.data}
                    isLoading={this.state.isLoading}
                    page={this.state.page}
                    onPaginatedSearch={this.onPaginatedSearch}
                />

                <div className="interactions">
                    {this.state.isLoading && <span>Loading...</span>}
                </div>
                <div className="interactions">
                    {
                        (this.state.page !== null && !this.state.isLoading) &&
                        <button
                            type="button"
                            onClick={this.onPaginatedSearch}
                        >
                            More
                        </button>
                    }
                </div>

            </div>
        );
    }
}


export default Search
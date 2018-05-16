import React, { Component } from 'react'
import axios from 'axios'
import List from './List'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { deepOrange500 } from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {Tabs, Tab} from 'material-ui/Tabs'
import 'typeface-roboto'
import Ionicon from 'react-ionicons'
import querystring from 'querystring'


//import Suggestions from './Suggestions'

// Theme
const muiTheme = getMuiTheme({
    palette: {
        accent1Color: deepOrange500
    }
})

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
};

const applyUpdateResult = (response) => (prevState) => ({
    data: [...prevState.data, ...response.data.articles],
    isLoading: false,
});

const applySetResult = (response) => (prevState) => ({
    data: response.data.articles,
    isLoading: false,
});


// const applybias = (bias, domains) => (prevState) => ({
//     data: response.data.articles,
//
// });

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

// const getNews = (value, page) =>
//     (typeof this.state.domains === "undefined"
//         ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(value)}&sortBy=publishedAt=&page=${page}&apiKey=${API_KEY}`
//         : `https://newsapi.org/v2/everything?q=${encodeURIComponent(value)}&domains=${this.state.domains}&sortBy=publishedAt=&page=${page}&apiKey=${API_KEY}`);

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            page: null,
            isLoading: false,
            inputValue: '',
            domains:'msnbc,the-huffington-post,vice-news',
        };
    }

    getNews = (value, page) =>
        (typeof this.state.domains === "undefined"
            ? `https://newsapi.org/v2/everything?q=${encodeURIComponent(value)}&sortBy=publishedAt=&page=${page}&apiKey=${API_KEY}`
            : `https://newsapi.org/v2/everything?q=${encodeURIComponent(value)}&sources=${this.state.domains}&sortBy=publishedAt=&page=${page}&apiKey=${API_KEY}`);

    onInitialSearch = (e) => {
        e.preventDefault();
        //const { value } = this.input;

        //console.log("contst value is", value);

        //  this.setState({ inputValue : this.input}), function () {
        //     console.log("inputValue  is ",this.state.inputValue);
        // };
        console.log("inputValue  is ",this.state.inputValue);


        // if (value === '') {
        //     return;
        // }
        //console.log("value in oninitialsearch is", this.inputValue)

        this.fetchStories(this.state.inputValue, 1 );
    }

    // setDomain = (tab) => {
    //     console.log('setDomain has run');
    //     if(tab ==="far-left") {
    //         this.domains = "msnbc,the-huffington-post,vice-news";
    //         console.log('setDomain: Far Left');
    //         console.log('this.domains is: ',this.domains);
    //     }else if(tab ==="left"){
    //         this.domains = "buzzfeed,cnn,the-guardian-uk,the-washington-post,the-new-york-times,axios,politico,mashable,nbc-news,new-york-magazine,newsweek,the-verge";
    //         console.log('setDomain: left');
    //         console.log('this.domains is: ',this.domains);
    //     }else if(tab ==="moderate"){
    //         this.domains = "associated-press,reuters,bloomberg,abc-news,cbs-news,bbc-news,usa-today,time,al-jazeera-english,business-insider,cnbc";
    //         console.log('setDomain: moderate');
    //         console.log('this.domains is: ',this.domains);
    //     }else if(tab ==="right"){
    //         this.domains = "the-economist,the-hill,the-wall-street-journal,national-review,the-washington-times,the-telegraph";
    //         console.log('setDomain:  right');
    //         console.log('this.domains is: ',this.domains);
    //     }else if(tab === "far-right"){
    //         this.domains = "the-american-conservative,fox-news,breitbart-news,daily-mail";
    //         console.log('setDomain: far right');
    //         console.log('this.domains is: ',this.domains);
    //     }else {
    //         this.domains = "";
    //     }
    //     //this.fetchStories(this.state.value, 1 );
    //
    // }

    handleActive = (tab) => {
            if(tab==="far-left")

                console.log('domains is set to state:', this.state.domains);
            console.log('setDomain: Far Left');
    }

    onPaginatedSearch = (e) => {
        this.fetchStories(this.input.value, this.state.page + 1);
    }

    fetchStories = (value, page) => {
        this.setState({ isLoading: true });
        this.setState({ page: page});
        console.log("::::this.domains inside fetchStories is ",this.state.domains);
        axios.get(this.getNews(value, page))
            .then(response => {
                console.log("data before is ", this.state.data);

                this.setState({data: response.data.articles});
                console.log("data is ", this.state.data);
                console.log("data is set to", response.data.articles);
                this.onSetResult(response, page);
                console.log("api call is ", this.getNews(value, page));
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
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="page">
                    <div className="App-search">
                        <form type="submit" onSubmit={this.onInitialSearch}>
                            {/*<input type="text" ref={node => this.input = node} />*/}
                            <input type="text" onChange={(e) => this.setState({inputValue: e.target.value})} value={this.state.inputValue} />


                            <button type="submit">Search</button>
                        </form>
                    </div>
                    <Tabs>
                        <Tab label="All">
                            <div>
                                <List
                                    list={this.state.data}
                                    isLoading={this.state.isLoading}
                                    page={this.state.page}
                                    onPaginatedSearch={this.onPaginatedSearch}
                                />

                                <div className="interactions">

                                    {this.state.isLoading &&
                                    <span>Loading...</span>
                                    }
                                    {this.state.isLoading &&
                                    <Ionicon icon="ios-ionic-outline" fontSize="60px" color="#347eff" width="100%" textAlign="center" rotate={true}/>
                                    }
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
                        </Tab>
                        <Tab onActive={this.handleActive('far-left')} label="Far Left" >
                            <div>
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
                        </Tab>
                        <Tab label="Left" >
                            <div>
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
                        </Tab>
                        <Tab  label="Moderate" >
                            <div>
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
                        </Tab>
                        <Tab   label="Right">
                            <div>
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
                        </Tab>
                        <Tab  label="Far Right">
                            <div>
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
                        </Tab>
                    </Tabs>
                </div>
            </MuiThemeProvider>
        );
    }
}


export default Search
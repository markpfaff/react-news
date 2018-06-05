import React, { Component } from 'react'
import axios from 'axios'
import List from './List'
import {Tabs,Tab} from 'material-ui/Tabs'
import 'typeface-roboto'
import Ionicon from 'react-ionicons'
import './Search.css'
import loading from './loading.svg'
import logo from './logo.svg'
import FlatButton from 'material-ui/FlatButton'

const applyUpdateResult = (response) => (prevState) => ({
    data: [...prevState.data, ...response.data.articles],
    isLoading: false,
});

const applySetResult = (response) => (prevState) => ({
    data: response.data.articles,
    isLoading: false,
});

const all = {
    background: '#f5f5f5',
    color: '#000000',
    whiteSpace: 'normal',
    wordWrap: 'break-word'
};

const farLeft = {
    background: '#263ebf',
    color: '#ffffff',
    whiteSpace: 'normal',
    wordWrap: 'break-word'
};
const left = {
    background: '#673ab7',
    color: '#ffffff',
    whiteSpace: 'normal',
    wordWrap: 'break-word'
};
const center = {
    background: '#9c27b0',
    color: '#ffffff',
    whiteSpace: 'normal',
    wordWrap: 'break-word'
};
const right  ={
    background: '#b73a5d',
    color: '#ffffff',
    whiteSpace: 'normal',
    wordWrap: 'break-word'
};
const farRight ={
    background: '#e42424',
    color: '#ffffff',
    whiteSpace: 'normal',
    wordWrap: 'break-word'
};

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            page: null,
            isLoading: false,
            inputValue: 'Bitcoin',
            domains:'',
            tabValue:'all',
        };
    }

    componentDidMount() {
        this.fetchStories(this.state.inputValue, 1);
    }

    getNews = (value, page) => {
        var sources = '';

        switch(this.state.tabValue) {
            case "far-left":
                sources = "&sources=msnbc,the-huffington-post,vice-news";
                break;
            case "left":
                sources = "&sources=buzzfeed,cnn,the-guardian-uk,the-washington-post,the-new-york-times,axios,politico,mashable,nbc-news,new-york-magazine,newsweek,the-verge";
                break;
            case "center":
                sources = "&sources=associated-press,reuters,bloomberg,abc-news,cbs-news,bbc-news,usa-today,time,al-jazeera-english,business-insider,cnbc";
                break;
            case "right":
                sources = "&sources=the-economist,the-hill,the-wall-street-journal,national-review,the-washington-times,the-telegraph";
                break;
            case "far-right":
                sources = "&sources=the-american-conservative,fox-news,breitbart-news,daily-mail";
                break;
            default:
                sources = "";
        }

        return  `https://newsapi.org/v2/everything?q=${encodeURIComponent(value)}${sources}&language=en&sortBy=publishedAt&page=${page}&apiKey=${API_KEY}`;


    }

    onInitialSearch = (e) => {
        e.preventDefault();
        this.fetchStories(this.state.inputValue, 1);
    }

    handleChange = (value) => {
        this.setState({
            tabValue: value,
        });
        console.log('handleChange has run, tabValue is', this.state.tabValue);
        this.fetchStories(this.state.inputValue, 1);
        console.log('tabValue fetchstories has run');
    };


    onPaginatedSearch = (e) => {
        this.fetchStories(this.state.inputValue, this.state.page + 1);
    }

    fetchStories = (value, page) => {
        this.setState({ isLoading: true });
        this.setState({ page: page});
        console.log('tabValue inside fetchstories is ', this.state.tabValue);

        //console.log("::::this.domains inside fetchStories is ",this.state.domains);
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
                <div className="page">
                    <header className="App-header">
                        {/*<AppBarMenu />*/}
                        {/*<img src={logo} className="App-logo" alt="logo" />*/}
                            <h1 className="App-title">
                                <img src={logo} className="App-logo" alt="Spectrum Logo"/>
                            </h1>
                            <div className="App-search">
                                <form className="search-form" type="submit" onSubmit={this.onInitialSearch}>
                                    <input type="text" onChange={(e) => this.setState({inputValue: e.target.value})} value={this.state.inputValue} />
                                    <button className="search-button" type="submit">
                                        <Ionicon icon="md-search" fontSize="25px" color="#ffffff" width="100%" textAlign="center" rotate={false}/>
                                    </button>
                                </form>
                            </div>
                        <div className="subtitle-container">
                            <span className="subtitle">Created by Mark Pfaff, Powered by<a href="https://newsapi.org/"> News API </a></span>
                        </div>
                    </header>

                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        <Tab style={all} label="All" value='all'>
                            <div>
                                <div className="loading-container">
                                    {this.state.isLoading &&
                                    <img src={loading} className="Loading" alt="Loading"/>
                                    }
                                </div>
                                <List
                                    list={this.state.data}
                                    isLoading={this.state.isLoading}
                                    page={this.state.page}
                                    onPaginatedSearch={this.onPaginatedSearch}
                                    className="all"
                                />

                                <div className="interactions">
                                    {
                                        (this.state.page !== null && !this.state.isLoading) &&
                                        <FlatButton
                                            hoverColor='#333333'
                                            rippleColor='#ffffff'
                                            backgroundColor='#333333'
                                            style={{color:'#ffffff'}}
                                            onClick={this.onPaginatedSearch}
                                        >
                                            More
                                        </FlatButton>
                                    }
                                </div>
                            </div>
                        </Tab>
                        <Tab style={farLeft} value='far-left' label="Far Left" >
                            <div>

                                <div className="loading-container">
                                    {this.state.isLoading &&
                                    <img src={loading} className="Loading" alt="Loading"/>
                                    }
                                </div>
                                <List
                                    list={this.state.data}
                                    isLoading={this.state.isLoading}
                                    page={this.state.page}
                                    onPaginatedSearch={this.onPaginatedSearch}
                                    className="far-left"

                                />

                                <div className="interactions">
                                    {
                                        (this.state.page !== null && !this.state.isLoading) &&
                                        <FlatButton
                                            hoverColor='#333333'
                                            rippleColor='#ffffff'
                                            backgroundColor='#333333'
                                            style={{color:'#ffffff'}}
                                            onClick={this.onPaginatedSearch}
                                        >
                                            More
                                        </FlatButton>
                                    }
                                </div>
                            </div>
                        </Tab>
                        <Tab style={left} label="Left" value='left' >
                            <div>

                                <div className="loading-container">
                                    {this.state.isLoading &&
                                    <img src={loading} className="Loading" alt="Loading"/>
                                    }
                                </div>
                                <List
                                    list={this.state.data}
                                    isLoading={this.state.isLoading}
                                    page={this.state.page}
                                    onPaginatedSearch={this.onPaginatedSearch}
                                    className="left"
                                />


                                <div className="interactions">
                                    {
                                        (this.state.page !== null && !this.state.isLoading) &&
                                        <FlatButton
                                            hoverColor='#333333'
                                            rippleColor='#ffffff'
                                            backgroundColor='#333333'
                                            style={{color:'#ffffff'}}
                                            onClick={this.onPaginatedSearch}
                                        >
                                            More
                                        </FlatButton>
                                    }
                                </div>
                            </div>
                        </Tab>
                        <Tab style={center} label="center" value='center' >
                            <div>

                                <div className="loading-container">
                                    {this.state.isLoading &&
                                    <img src={loading} className="Loading" alt="Loading"/>
                                    }
                                </div>
                                <List
                                    list={this.state.data}
                                    isLoading={this.state.isLoading}
                                    page={this.state.page}
                                    onPaginatedSearch={this.onPaginatedSearch}
                                    className="center"
                                />

                                <div className="interactions">
                                    {
                                        (this.state.page !== null && !this.state.isLoading) &&
                                        <FlatButton
                                            hoverColor='#333333'
                                            rippleColor='#ffffff'
                                            backgroundColor='#333333'
                                            style={{color:'#ffffff'}}
                                            onClick={this.onPaginatedSearch}
                                        >
                                            More
                                        </FlatButton>
                                    }
                                </div>
                            </div>
                        </Tab>
                        <Tab style={right} label="Right" value='right' >
                            <div>

                                <div className="loading-container">
                                    {this.state.isLoading &&
                                    <img src={loading} className="Loading" alt="Loading"/>
                                    }
                                </div>
                                <List
                                    list={this.state.data}
                                    isLoading={this.state.isLoading}
                                    page={this.state.page}
                                    onPaginatedSearch={this.onPaginatedSearch}
                                    className="right"
                                />

                                <div className="interactions">
                                    {
                                        (this.state.page !== null && !this.state.isLoading) &&
                                        <FlatButton
                                            hoverColor='#333333'
                                            rippleColor='#ffffff'
                                            backgroundColor='#333333'
                                            style={{color:'#ffffff'}}
                                            onClick={this.onPaginatedSearch}
                                        >
                                            More
                                        </FlatButton>
                                    }
                                </div>
                            </div>
                        </Tab>
                        <Tab style={farRight} label="Far Right" value='far-right' >
                            <div>

                                <div className="loading-container">
                                    {this.state.isLoading &&
                                    <img src={loading} className="Loading" alt="Loading"/>
                                    }
                                </div>
                                <List
                                    list={this.state.data}
                                    isLoading={this.state.isLoading}
                                    page={this.state.page}
                                    onPaginatedSearch={this.onPaginatedSearch}
                                    className="far-right"
                                />

                                <div className="interactions">
                                    {
                                        (this.state.page !== null && !this.state.isLoading) &&
                                        <FlatButton
                                            hoverColor='#333333'
                                            rippleColor='#ffffff'
                                            backgroundColor='#333333'
                                            style={{color:'#ffffff'}}
                                            onClick={this.onPaginatedSearch}
                                        >
                                            More
                                        </FlatButton>
                                    }
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
        );
    }
}


export default Search
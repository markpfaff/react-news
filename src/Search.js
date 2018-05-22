import React, { Component } from 'react';
import axios from 'axios';
import List from './List';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { deepOrange } from '@material-ui/core/colors';
//import getMuiTheme from '@material-ui/core/styles/getMuiTheme';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import 'typeface-roboto';
import Ionicon from 'react-ionicons';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { createMuiTheme } from '@material-ui/core/styles';

function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

// Theme
const muiTheme = createMuiTheme({
    palette: {
        accent1Color: deepOrange
    },

})

const styles = theme => ({
    root: {
        backgroundColor: deepOrange,
    },
});


const applyUpdateResult = (response) => (prevState) => ({
    data: [...prevState.data, ...response.data.articles],
    isLoading: false,
});

const applySetResult = (response) => (prevState) => ({
    data: response.data.articles,
    isLoading: false,
});

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            page: null,
            isLoading: false,
            inputValue: '',
            domains:'',
            tabValue:'all',
            swipeValue: 0,
        };
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

        return  `https://newsapi.org/v2/everything?q=${encodeURIComponent(value)}${sources}&sortBy=publishedAt=&page=${page}&apiKey=${API_KEY}`;


    }

    onInitialSearch = (e) => {
        e.preventDefault();

        this.fetchStories(this.state.inputValue, 1);
    }

    handleChange = (value) => {
        this.setState({
            tabValue: value,
        });
        console.log('handleChange has run, tabValue is', this.state.tabValue)
        this.fetchStories(this.state.inputValue, this.state.page + 1);
        console.log('tabValue fetchstories has run');

    };

    handleChangeIndex = index => {
        this.setState({ swipeValue: index });
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
        const { classes, theme } = this.props;

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className={classes.root}>
                    <div className="App-search">
                        <form type="submit" onSubmit={this.onInitialSearch}>
                            <input type="text" onChange={(e) => this.setState({inputValue: e.target.value})} value={this.state.inputValue} />


                            <button type="submit">Search</button>
                        </form>
                    </div>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                    >

                        <Tab label="All" value='all'>

                        </Tab>
                        <Tab value='far-left' label="Far Left">

                        </Tab>
                        <Tab label="Left" value='left'>

                        </Tab>
                        <Tab  label="Center" value='center'>

                        </Tab>
                        <Tab   label="Right" value='right'>

                        </Tab>
                        <Tab  label="Far Right" value='far-right'>

                        </Tab>
                    </Tabs>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={this.state.value}
                            onChangeIndex={this.handleChangeIndex}
                        >
                            <TabContainer dir={theme.direction}>
                                <div>
                                    <List
                                        list={this.state.data}
                                        isLoading={this.state.isLoading}
                                        page={this.state.page}
                                        onPaginatedSearch={this.onPaginatedSearch}
                                    />

                                    <div className="interactions">
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
                            </TabContainer>
                            <TabContainer dir={theme.direction}>
                                <div>
                                    <List
                                        list={this.state.data}
                                        isLoading={this.state.isLoading}
                                        page={this.state.page}
                                        onPaginatedSearch={this.onPaginatedSearch}
                                    />

                                    <div className="interactions">
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
                            </TabContainer>
                            <TabContainer dir={theme.direction}>
                                <div>
                                    <List
                                        list={this.state.data}
                                        isLoading={this.state.isLoading}
                                        page={this.state.page}
                                        onPaginatedSearch={this.onPaginatedSearch}
                                    />

                                    <div className="interactions">
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
                            </TabContainer>
                            <TabContainer dir={theme.direction}>
                                <div>
                                    <List
                                        list={this.state.data}
                                        isLoading={this.state.isLoading}
                                        page={this.state.page}
                                        onPaginatedSearch={this.onPaginatedSearch}
                                    />

                                    <div className="interactions">
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
                            </TabContainer>
                            <TabContainer dir={theme.direction}>
                                <div>
                                    <List
                                        list={this.state.data}
                                        isLoading={this.state.isLoading}
                                        page={this.state.page}
                                        onPaginatedSearch={this.onPaginatedSearch}
                                    />

                                    <div className="interactions">
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
                            </TabContainer>
                            <TabContainer dir={theme.direction}>
                                <div>
                                    <List
                                        list={this.state.data}
                                        isLoading={this.state.isLoading}
                                        page={this.state.page}
                                        onPaginatedSearch={this.onPaginatedSearch}
                                    />

                                    <div className="interactions">
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
                            </TabContainer>

                        </SwipeableViews>

                </div>
            </MuiThemeProvider>
        );
    }
}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Search);
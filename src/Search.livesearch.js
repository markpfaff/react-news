import React, { Component } from 'react'
import axios from 'axios'
import Suggestions from './Suggestions'
//import { API_KEY } from './constants.js';


class Search extends Component {
    constructor(props) {
        // Pass props to parent class
        super(props);
        // Set initial state
        this.state = {
            query: '',
            data: [],
            count: 0,
            // value:'bbc-news'
            value: this.props.default
        };
        this.handleInputChange = this.handleInputChange.bind(this);

    }
    getInfo = () => {

        const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
        console.log('api key is '+ API_KEY);


        axios.get(`https://newsapi.org/v2/everything?q=putin&apiKey=${API_KEY}`)
            .then(res => {
                console.log("axios get value is ", this.state.value);
                console.log("this state query is  ", this.state.query);
                console.log("res.data.sources is  ", res.data.sources.length);

                // Set state with result
                this.setState({ data: res.data.sources });
                this.setState({ count: res.data.sources.length });
                //console.log(this.state.data);



            // ({ data }) => {
                // this.setState({
                //     results: data.data
                // })
                // console.log('data is:' + data.data);

            })
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
                console.log("response error code is ", error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("response error code is ",  error.message);
            }
            console.log("response error code is ",  error.config);
        })
    }

    handleInputChange = () => {
        this.setState({
            query: this.search.value
        }, () => {
            if (this.state.query && this.state.query.length > 1) {
                if (this.state.query.length % 2 === 0) {
                    this.getInfo()
                }
            } else if (!this.state.query) {
            }
        })
    }

    render() {
        return (
            <form>
                <input
                    placeholder="Search for..."
                    ref={input => this.search = input}
                    onChange={this.handleInputChange}
                />
                <Suggestions results={this.state.data} />
            </form>
        )
    }
}

export default Search
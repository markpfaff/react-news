import React, { Component } from 'react';
import Search from './Search.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React News App</h1>
            <h4 className="App-title">Created by Mark Pfaff</h4>
        </header>
        <div className="App-intro">
            <h4>Powered by<a href="https://newsapi.org/"> News API </a></h4>
        </div>
        <Search default="abc-news"/>
      </div>
    );
  }
}

export default App;

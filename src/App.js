import React, { Component } from 'react';
import Search from './Search.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          <h1 className="App-title">Spectrum</h1>
            <h2 className="subtitle">Created by Mark Pfaff</h2>
            <h2 className="subtitle">Powered by<a href="https://newsapi.org/"> News API </a></h2>
        </header>
        <Search default="abc-news"/>
      </div>
    );
  }
}

export default App;

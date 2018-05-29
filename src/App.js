import React, { Component } from 'react';
import Search from './Search.js';
import logo from './logo.svg';
import './App.css';
import AppBarMenu from './AppBarMenu';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { deepOrange500 } from 'material-ui/styles/colors'

// Theme
const muiTheme = getMuiTheme({
    palette: {
        accent1Color: deepOrange500
    }
});

class App extends Component {
  render() {
    return (
        <MuiThemeProvider theme={muiTheme}>
            <div className="App">
            <Search />
          </div>
        </MuiThemeProvider>
    );
  }
}

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Authen from './Authen';



class App extends Component {
  render(){
    return(
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>
            Welcome to the React
          </h2>
        </header>
        <Authen />
      </div>
    );
  }
}


export default App;

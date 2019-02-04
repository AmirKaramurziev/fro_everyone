import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Magazine from './components/magazine';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Magazine/>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import STORE from './dummy-store';
import Header from './header/header'
import Sidebar from './sidebar/sidebar';
import './App.css';
import MainSection from './mainSection/mainSection';


class App extends Component {
  state= {
    STORE,
    selectedFolder: null
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="group">
          <Sidebar folders={STORE.folders}/>
          <MainSection store={STORE} selectedFolder={this.state.selectedFolder}/>
        </div>
      </div>
    );
  }
}

export default App;

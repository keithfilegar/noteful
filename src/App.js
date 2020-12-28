import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import STORE from './dummy-store';
import Header from './header/header'
import FolderList from './sidebar/folderList';
import './App.css';
import MainSection from './mainSection/mainSection';


class App extends Component {
  state= {
    STORE
  }

  renderFolders() {
    return (
      <>
        <Route
            exact
            path='/'
            render={routeProps => (
              <FolderList 
                folders={this.state.STORE.folders}
                {...routeProps}
              />
            )}
          />
      </>
    )
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="group">
          <div className="sidebar-container item">
              {this.renderFolders()}
          </div>
            <MainSection store={this.state.STORE}/>
          </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import logo from './logo.svg';
import './App.css';
import UserList from './modules/User/UserList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Normalizr &amp; reselect</h2>
        </div>
        <Container className="App-intro">
          <UserList />
        </Container>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Container, Button } from 'semantic-ui-react';
import Perf from 'react-addons-perf';
import logo from './logo.svg';
import './App.css';
import UserList from './modules/User/UserList';

class App extends Component {
  state = {
    started: false,
  }

  onTogglePerf = () => {
    const { started } = this.state;
    if (!started) {
      Perf.start();
    } else {
      Perf.stop();
      Perf.printInclusive(Perf.getLastMeasurements());
    }

    this.setState({
      started: !started,
    });
  }

  render() {
    const { started } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Normalizr &amp; reselect</h2>
        </div>
        <Container className="App-intro">
          <div className="PerformanceActions text-center">
            <Button
              content={!started ? 'Start' : 'Stop'}
              icon={!started ? 'play' : 'stop'}
              labelPosition='right'
              onClick={this.onTogglePerf}
            />
          </div>
          <div>
            <UserList />
          </div>
        </Container>
      </div>
    );
  }
}

export default App;

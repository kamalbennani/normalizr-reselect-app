import React, { Component } from 'react';
import { Container, Button } from 'semantic-ui-react';
import Perf from 'react-addons-perf';

import UserList from './modules/User/UserList';
import PostList from './modules/Post/PostList';
import Counter from './modules/Counter/Counter';
import logo from './logo.svg';
import './App.css';

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
      console.group('Overall time taken');
      Perf.printInclusive(Perf.getLastMeasurements());
      console.groupEnd('Overall time taken');
      console.group('Wasted Time');
      Perf.printWasted(Perf.getLastMeasurements());
      console.groupEnd('Wasted Time');
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
          <div>
            <PostList />
          </div>
        </Container>
      </div>
    );
  }
}

export default App;

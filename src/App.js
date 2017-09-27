import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Button } from 'semantic-ui-react';
import Perf from 'react-addons-perf';

import UserList from './modules/User/UserList';
import Counter from './modules/Counter/Counter';
import { fetchUsersList } from './modules/User/redux/reducer';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    started: false,
  }

  componentDidMount() {
    this.props.fetchUsers();
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
            <Counter />
          </div>
          <div>
            <UserList />
          </div>
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUsers: () => dispatch(fetchUsersList()),
  }
}

export default connect(null, mapDispatchToProps)(App);

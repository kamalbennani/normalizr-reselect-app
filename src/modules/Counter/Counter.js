import React from 'react';
import {connect} from 'react-redux';
import { Icon, Statistic } from 'semantic-ui-react';

class Counter extends React.Component {
  componentDidMount() {
    setInterval(() => {
      this.props.increment();
    }, 500);
  }
  render() {
    return (
      <Statistic>
        <Statistic.Value>
          <Icon name='hourglass half' />
          {this.props.count}
        </Statistic.Value>
        <Statistic.Label><br /> Count</Statistic.Label>
      </Statistic>
    );
  }
}

const mapStateToProps = (state) => ({ count: state.count });
const mapDispatchToProps = {
  increment: () => ({type: 'INCREMENT'}),
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
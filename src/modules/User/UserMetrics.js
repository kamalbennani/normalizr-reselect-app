import React, { Component } from 'react'
import { connect } from 'react-redux';
import { groupUsersByGender, groupUsersByNationality } from './redux/selectors';
import { Segment, Statistic } from 'semantic-ui-react';
import sample from 'lodash/sample';

const COLORS = ['orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey'];

class UserMetrics extends Component {
  render() {
    const { usersByGender, usersByNationality } = this.props;
    return (
      <Segment inverted>
        <div>
          <Statistic inverted color={sample(COLORS)} value={usersByGender.get('male')} label='Male' />
          <Statistic inverted color={sample(COLORS)} value={usersByGender.get('female')} label='Female' />
        </div>
        {usersByNationality.map((userByNat, nat) => 
          <Statistic inverted color={sample(COLORS)} value={userByNat} label={nat} />
        )}
      </Segment>
    )
  }
}

const makeMapStateToProps = (state, ownProps) => {
  return {
    usersByGender: groupUsersByGender(state),
    usersByNationality: groupUsersByNationality(state),
  }
}

export default connect(makeMapStateToProps)(UserMetrics);
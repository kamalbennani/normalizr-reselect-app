import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Grid, List } from 'semantic-ui-react';

import { fetchUsersList, toggleActiveStatus } from './redux/reducer';
import UserItem from './UserItem';
import UserMetrics from './UserMetrics';

class UserList extends Component {

  handleItemClick = (userId) => {
    this.props.toggleUserActive(userId);
  }

  render() {
    const { usersIds } = this.props;
    return (
      <Grid centered padded columns={2}>
        <Grid.Row>
          <UserMetrics />
        </Grid.Row>
        <Grid.Column>
          <List selection>
            {usersIds.map(userId => <UserItem key={userId} userId={userId} handleItemClick={() => this.handleItemClick(userId)}/>)}
          </List>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    usersIds: state.users.get('ids'),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUsers: () => dispatch(fetchUsersList()),
    toggleUserActive: (userId) => dispatch(toggleActiveStatus(userId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
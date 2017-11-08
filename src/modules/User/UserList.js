import React, { Component } from 'react'
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';

import { fetchUsersList, toggleActiveStatus } from './redux/reducer';
import UserItem from './UserItem';

class UserList extends Component {

  handleItemClick = (userId) => {
    this.props.toggleUserActive(userId);
  }

  render() {
    const { usersIds } = this.props;
    return (
      <List selection>
        {usersIds.map(userId => <UserItem key={userId} userId={userId} handleItemClick={() => this.handleItemClick(userId)}/>)}
      </List>
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
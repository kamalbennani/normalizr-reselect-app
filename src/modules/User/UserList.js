import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import { fetchUsersList, toggleActiveStatus } from './redux/reducer';
import { Grid, List } from 'semantic-ui-react';
import UserItem from './UserItem';

class UserList extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  handleItemClick = (userId) => {
    this.props.toggleUserActive(userId);
  }

  render() {
    const { users } = this.props;
    return (
      <Grid centered padded columns={2}>
        <Grid.Column>
          <List selection>
            {users.map(user => <UserItem key={user.email} user={fromJS(user)} handleItemClick={() => this.handleItemClick(user.email)}/>)}
          </List>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    users: state.users.get('entities').toJS(),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUsers: () => dispatch(fetchUsersList()),
    toggleUserActive: (userId) => dispatch(toggleActiveStatus(userId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
import React, { Component } from 'react'
import { connect } from 'react-redux';
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
            {users.map(user => <UserItem key={user.get('email')} user={user} handleItemClick={() => this.handleItemClick(user.get('email'))}/>)}
          </List>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    users: state.users.get('entities'),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUsers: () => dispatch(fetchUsersList()),
    toggleUserActive: (userId) => dispatch(toggleActiveStatus(userId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
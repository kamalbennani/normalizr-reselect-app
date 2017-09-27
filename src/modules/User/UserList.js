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
    const { usersIds } = this.props;
    return (
      <Grid centered padded columns={2}>
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
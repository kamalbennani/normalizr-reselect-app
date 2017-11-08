import React, { Component } from 'react'
import { connect } from 'react-redux';
import { List, Image } from 'semantic-ui-react';

import { selectedUsersSelectors } from './redux/selectors';

class SelectedUsersList extends Component {
  render() {
    const { selectedUsers } = this.props;
    console.log('selectedUsers', selectedUsers);
    return (
      <div>
        <div>Selected Users</div>
        <List horizontal>
          {selectedUsers.map(user => (
            <List.Item>
              <Image avatar src={user.getIn(['picture', 'thumbnail'])} />
              <List.Content>
                <List.Header>{user.getIn(['name', 'first'])} {user.getIn(['name', 'last'])}</List.Header>
              </List.Content>
            </List.Item>
          ))}
        </List>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    selectedUsers: selectedUsersSelectors(state),
  }
}


export default connect(mapStateToProps)(SelectedUsersList);
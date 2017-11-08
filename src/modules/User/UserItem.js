import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Image, Icon } from 'semantic-ui-react';

class UserItem extends Component {
  render() {
    const { user, handleItemClick, isActive } = this.props;
    console.log('isActive', isActive);
    return (
      <List.Item key={user.get('email')} onClick={handleItemClick}>
        <Image avatar src={user.getIn(['picture', 'thumbnail'])} />
        <List.Content>
          <List.Header as='a'>{user.getIn(['name', 'first'])} {user.getIn(['name', 'last'])}</List.Header>
          <List.Description>{user.get('email')}</List.Description>
        </List.Content>
        <List.Content floated='right'>
          {isActive ? <Icon name="checkmark" /> : <Icon name="remove" />}
        </List.Content>
      </List.Item>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users.getIn(['entities', ownProps.userId]),
    isActive: state.users.get('activeUserIds').includes(ownProps.userId),
  }
}

export default connect(mapStateToProps)(UserItem);

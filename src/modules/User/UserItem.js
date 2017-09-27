import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { List, Image, Icon } from 'semantic-ui-react';

class UserItem extends PureComponent {
  render() {
    const { user, handleItemClick } = this.props;
    return (
      <List.Item key={user.get('email')} onClick={handleItemClick}>
        <Image avatar src={user.getIn(['picture', 'thumbnail'])} />
        <List.Content>
          <List.Header as='a'>{user.getIn(['name', 'first'])} {user.getIn(['name', 'last'])}</List.Header>
          <List.Description>{user.get('email')}</List.Description>
        </List.Content>
        <List.Content floated='right'>
          {user.get('isActive') ? <Icon name="checkmark" /> : <Icon name="remove" />}
        </List.Content>
      </List.Item>
    )
  }
}

export default UserItem;

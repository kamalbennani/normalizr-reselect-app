import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Card, Icon } from 'semantic-ui-react';

class PostItem extends PureComponent {
  render() {
    const { post, handleItemClick } = this.props;
    if (!post) return null;
    return (
      <Card>
        <Card.Content header={post.get('title')} />
        <Card.Content description={post.get('body')} />
        <Card.Content extra>
          <Icon name='user' />
          {post.get('author')}
        </Card.Content>
      </Card>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    post: state.posts.getIn(['entities', ownProps.postId.toString()]),
  }
}

export default connect(mapStateToProps)(PostItem);

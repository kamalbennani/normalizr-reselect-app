import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Grid, List, Card } from 'semantic-ui-react';
import PostItem from './PostItem';

class PostList extends Component {
  render() {
    const { postIds } = this.props;
    return (
      <Grid centered padded columns={2}>
        <Card.Group>
          {postIds.map(postId => <PostItem key={postId} postId={postId} handleItemClick={() => this.handleItemClick(postId)}/>)}
        </Card.Group>
      </Grid>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    postIds: state.posts.get('ids'),
  }
}

export default connect(mapStateToProps)(PostList);
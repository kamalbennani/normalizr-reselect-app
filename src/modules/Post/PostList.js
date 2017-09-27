import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Grid, List } from 'semantic-ui-react';
import PostItem from './PostItem';

class PostList extends Component {
  render() {
    const { postIds } = this.props;
    return (
      <Grid centered padded columns={2}>
        <Grid.Column>
          <List selection>
            {postIds.map(postId => <PostItem key={postId} postId={postId} handleItemClick={() => this.handleItemClick(postId)}/>)}
          </List>
        </Grid.Column>
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
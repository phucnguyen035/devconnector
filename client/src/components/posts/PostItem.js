import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../actions/postActions';

const PostItem = (props) => {
  const { deletePost, addLike, removeLike, user, post, showActions } = props;

  const handleDeletePost = () => {
    deletePost(post._id);
  };

  const handleLike = () => {
    if (!post.likes.find(like => like.user === user.info.id)) {
      addLike(post._id);
    }
  };

  const handleUnlike = () => {
    if (post.likes.find(like => like.user === user.info.id)) {
      removeLike(post._id);
    }
  };

  const findUserLike = () => {
    if (post.likes.find(like => like.user === user.info.id)) {
      return true;
    }

    return false;
  };

  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <img className="rounded-circle" src={post.avatar} alt={post.user} />

          <p className="text-center">{post.name}</p>
        </div>

        <div className="col-md-10">
          <p className="lead">{post.text}</p>

          {showActions && (
            <div>
              <button type="button" className="btn btn-light mr-1" onClick={handleLike}>
                <i
                  className={classnames('text-secondary fas fa-thumbs-up', {
                    'text-info': findUserLike()
                  })}
                />
                <span className="badge badge-light ml-2">{post.likes.length}</span>
              </button>

              <button type="button" className="btn btn-light mr-1" onClick={handleUnlike}>
                <i className="text-secondary fas fa-thumbs-down" />
              </button>

              <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                Comments
              </Link>

              {post.user === user.info.id && (
                <button type="button" className="btn btn-danger mr-1" onClick={handleDeletePost}>
                  <i className="fas fa-times" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
PostItem.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

PostItem.defaultProps = {
  showActions: true
};

const mapStateToProps = state => ({ user: state.user, errors: state.errors });
const mapDispatchToProps = {
  deletePost,
  addLike,
  removeLike
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostItem);

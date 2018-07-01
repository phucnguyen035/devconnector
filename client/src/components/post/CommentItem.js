import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/postActions';

const CommentItem = (props) => {
  const { deleteComment, user, comment, postId } = props;

  const handleDeleteComment = () => {
    deleteComment(postId, comment._id);
  };

  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <img className="rounded-circle" src={comment.avatar} alt={comment.name} />

          <p className="text-center">{comment.name}</p>
        </div>

        <div className="col-md-10">
          <p className="lead">{comment.text}</p>

          {comment.user === user.info.id && (
            <button type="button" className="btn btn-danger mr-1" onClick={handleDeleteComment}>
              <i className="fas fa-trash" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
CommentItem.propTypes = {
  comment: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  postId: PropTypes.string.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ user: state.user, errors: state.errors });
const mapDispatchToProps = {
  deleteComment
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentItem);

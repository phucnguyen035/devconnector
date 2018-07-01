import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextArea from '../commons/TextArea';
import { addPost } from '../../actions/postActions';
import { changeInput, getErrors } from '../../utils/stateChanges';

class PostForm extends PureComponent {
  state = {
    text: '',
    errors: {}
  };

  componentDidUpdate = (prevProps) => {
    const { errors } = this.props;

    if (errors !== prevProps.errors) {
      this.setState(getErrors(errors));
    }
  };

  handleInputChange = (e) => {
    this.setState(changeInput(e));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { text } = this.state;
    const {
      addPost,
      user: { info }
    } = this.props;

    const postData = {
      text,
      name: info.name,
      avatar: info.avatar
    };

    addPost(postData);
    this.setState(() => ({ text: '' }));
  };

  render() {
    const { text, errors } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Something...</div>
          <div className="card-body">
            <form noValidate onSubmit={this.handleSubmit}>
              <TextArea
                name="text"
                placeholder="Create a post"
                value={text}
                error={errors.text}
                onChange={this.handleInputChange}
              />

              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  errors: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = state => ({ user: state.user, errors: state.errors });
const mapDispatchToProps = { addPost };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm);

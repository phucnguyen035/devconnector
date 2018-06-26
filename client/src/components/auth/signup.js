import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import * as Actions from '../../utils/stateChanges';
import { createUser } from '../../actions/authActions';
import InputField from '../commons/InputField';

class Signup extends PureComponent {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  };

  componentWillMount = () => {
    const { user } = this.props;
    if (user.isAuthenticated) {
      const { history } = this.props;
      history.push('/dashboard');
    }
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.errors) {
      this.setState(Actions.getErrors(nextProps.errors));
    }
  };

  handleInputChange = (e) => {
    e.persist();
    this.setState(Actions.changeInput(e));
  };

  handleSubmit = (e) => {
    const { errors, ...newUser } = this.state;
    const { handleCreateUser, history } = this.props;

    e.preventDefault();
    handleCreateUser(newUser, history);
  };

  render() {
    const { name, email, password, password2, errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form noValidate onSubmit={this.handleSubmit}>
                <InputField
                  type="name"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={this.handleInputChange}
                  error={errors.name}
                />
                <InputField
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={this.handleInputChange}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                  error={errors.email}
                />
                <InputField
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={this.handleInputChange}
                  error={errors.password}
                />
                <InputField
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  value={password2}
                  onChange={this.handleInputChange}
                  error={errors.password2}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  handleCreateUser: PropTypes.func.isRequired,
  errors: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired
};

export default connect(
  state => ({ errors: state.errors, user: state.user }),
  { handleCreateUser: createUser }
)(withRouter(Signup));

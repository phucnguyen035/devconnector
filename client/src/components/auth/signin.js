import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeInput, getErrors } from '../../utils/stateChanges';
import { loginUser } from '../../actions/authActions';
import InputField from '../commons/InputField';

class Signin extends PureComponent {
  state = {
    email: '',
    password: '',
    errors: {}
  };

  componentDidMount = () => {
    const { user, history } = this.props;
    if (user.isAuthenticated) {
      history.push('/dashboard');
    }
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
    const { errors, ...user } = this.state;
    const { loginUser, history } = this.props;

    e.preventDefault();
    loginUser(user, history);
  };

  render() {
    const { email, password, errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign In</h1>
              <p className="lead text-center">Sign in to your DevConnector account</p>
              <form noValidate onSubmit={this.handleSubmit}>
                <InputField
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={this.handleInputChange}
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
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Signin.propTypes = {
  loginUser: PropTypes.func.isRequired,
  errors: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any)
};

Signin.defaultProps = undefined;

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Signin);

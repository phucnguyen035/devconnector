import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Landing = (props) => {
  const { history, user } = props;
  const { isAuthenticated } = user;

  if (isAuthenticated) {
    history.push('/dashboard');
  }

  return (
    <div className="landing">
      <div className="dark-overlay landing-inner text-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4">Developer Connector</h1>
              <p className="lead">
                {' '}
                Create a developer profile/portfolio, share posts and get help from other developers
              </p>
              <hr />
              <Link to="/signup" className="btn btn-lg btn-info mr-2">
                Sign Up
              </Link>
              <Link to="/signin" className="btn btn-lg btn-light">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired
};

export default connect(state => ({ user: state.user }))(Landing);

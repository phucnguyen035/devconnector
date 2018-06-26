import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/authActions';

const Navbar = ({ user, logout, history }) => {
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    history.push('/');
  };

  const { isAuthenticated, info } = user;
  const authLinks = (
    <li className="nav-item">
      <a href="/" className="nav-link" onClick={handleLogout}>
        <img
          className="rounded-circle"
          src={info.avatar}
          alt={info.name}
          style={{ width: '25px', height: '25px' }}
        />{' '}
        Sign out
      </a>
    </li>
  );

  const guestLinks = (
    <Fragment>
      <li className="nav-item">
        <Link to="/signup" className="nav-link">
          Sign Up
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/signin" className="nav-link">
          Sign in
        </Link>
      </li>
    </Fragment>
  );

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <div className="container">
        <Link to="/" className="navbar-brand">
          DevConnector
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/profiles" className="nav-link">
                {' '}
                Developers
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">{isAuthenticated ? authLinks : guestLinks}</ul>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired
};

export default connect(
  state => ({ user: state.user }),
  { logout: logoutUser }
)(Navbar);

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavAuthLinks from './NavAuthLinks';
import NavGuestLinks from './NavGuestLinks';

const Navbar = ({ user }) => {
  const { isAuthenticated } = user;

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

          <ul className="navbar-nav ml-auto">
            {isAuthenticated ? <NavAuthLinks /> : <NavGuestLinks />}
          </ul>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired
};

export default connect(state => ({ user: state.user }))(Navbar);

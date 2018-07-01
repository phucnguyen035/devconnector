import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logoutUser } from '../../../actions/authActions';
import { clearUserProfile } from '../../../actions/profileActions';

const NavAuthLinks = ({ logoutUser, info, clearUserProfile, history }) => {
  const handleLogout = (e) => {
    e.preventDefault();
    clearUserProfile();
    logoutUser();
    history.push('/');
  };

  return (
    <Fragment>
      <li className="nav-item">
        <Link to="/feed" className="nav-link">
          Post Feed
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/dashboard" className="nav-link">
          Dashboard
        </Link>
      </li>

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
    </Fragment>
  );
};

NavAuthLinks.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  info: PropTypes.objectOf(PropTypes.any).isRequired,
  logoutUser: PropTypes.func.isRequired,
  clearUserProfile: PropTypes.func.isRequired
};

const mapDispatchToProps = { logoutUser, clearUserProfile };

export default connect(
  state => ({ info: state.user.info }),
  mapDispatchToProps
)(withRouter(NavAuthLinks));

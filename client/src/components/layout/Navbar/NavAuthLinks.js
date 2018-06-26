import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';
import { clearUserProfile } from '../../../actions/profileActions';

const NavAuthLinks = ({ logoutUser, history, info, clearUserProfile }) => {
  const handleLogout = (e) => {
    e.preventDefault();
    clearUserProfile();
    logoutUser();
    history.push('/');
  };

  return (
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
)(NavAuthLinks);

import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const NavGuessLinks = () => (
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

export default NavGuessLinks;

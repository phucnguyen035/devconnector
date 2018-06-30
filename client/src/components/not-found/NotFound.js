import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div>
    <h1 className="display-4">Page not found</h1>
    <p>Sorry, this page does not exist</p>
    <Link to="/" className="btn btn-lg btn-light">
      Go back
    </Link>
  </div>
);

export default NotFound;

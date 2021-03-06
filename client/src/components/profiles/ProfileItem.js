import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileItem = ({ profile }) => (
  <div className="card card-body bg-light mb-3" key={profile._id}>
    <div className="row">
      <div className="col-2">
        <img className="rounded-circle" src={profile.user.avatar} alt={profile.user.name} />
      </div>

      <div className="col-8 col-md-6">
        <h3>
          <Link to={`/profile/${profile.handle}`} className="text-dark">
            {profile.user.name}
          </Link>
        </h3>
        <p>
          {profile.status}{' '}
          {profile.company && (
            <span>
              at <span className="font-weight-bold">{profile.company}</span>
            </span>
          )}
        </p>
        {profile.location && <p>{profile.location}</p>}
        <Link to={`/profile/${profile.handle}`}> View Profile </Link>
      </div>

      <div className="col-md-4 d-none d-md-block">
        <h4>Skill Set</h4>
        <ul className="list-group">
          {/* eslint-disable react/no-array-index-key */}
          {profile.skills.slice(0, 4).map((skill, index) => (
            <li key={index} className="list-group-item">
              <i className="fa fa-check pr-1" />
              {skill}
            </li>
          ))}
          {/* eslint-enable react/no-array-index-key */}
        </ul>
      </div>
    </div>
  </div>
);

ProfileItem.propTypes = {
  profile: PropTypes.objectOf(PropTypes.any).isRequired
};

export default ProfileItem;

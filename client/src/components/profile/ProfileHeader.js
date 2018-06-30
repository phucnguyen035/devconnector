import React from 'react';
import PropTypes from 'prop-types';

const ProfileHeader = ({ profile }) => (
  <div className="row">
    <div className="col-md-12">
      <div className="card card-body bg-info text-white mb-3">
        <div className="row">
          <div className="col-4 col-md-3 m-auto">
            <img className="rounded-circle" src={profile.user.avatar} alt={profile.user.name} />
          </div>
        </div>

        <div className="text-center">
          <h1 className="display-4 text-center">{profile.user.name}</h1>
          <p className="lead text-center">
            {profile.status}{' '}
            {profile.company && (
              <span>
                at <span className="font-weight-bold">{profile.company}</span>
              </span>
            )}
          </p>
          {profile.location && <p>{profile.location}</p>}
          <p>
            {profile.website && (
              <a href={`https://www.${profile.website}`} className="text-white p-2">
                <i className="fas fa-globe fa-2x" />
              </a>
            )}
            {profile.social.twitter && (
              <a href={`https://${profile.social.twitter}`} className="text-white p-2">
                <i className="fab fa-twitter fa-2x" />
              </a>
            )}
            {profile.social.facebook && (
              <a href={`https://${profile.social.facebook}`} className="text-white p-2">
                <i className="fab fa-facebook fa-2x" />
              </a>
            )}
            {profile.social.youtube && (
              <a href={`https://${profile.social.youtube}`} className="text-white p-2">
                <i className="fab fa-youtube fa-2x" />
              </a>
            )}
            {profile.social.linkedin && (
              <a href={`https://${profile.social.linkedin}`} className="text-white p-2">
                <i className="fab fa-linkedin fa-2x" />
              </a>
            )}
            {profile.social.instagram && (
              <a href={`https://${profile.social.instagram}`} className="text-white p-2">
                <i className="fab fa-instagram fa-2x" />
              </a>
            )}
          </p>
        </div>
      </div>
    </div>
  </div>
);

ProfileHeader.propTypes = {
  profile: PropTypes.objectOf(PropTypes.any).isRequired
};

export default ProfileHeader;

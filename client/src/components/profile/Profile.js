import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import Spinner from '../commons/Spinner';
import { getProfileByHandle } from '../../actions/profileActions';

class Profile extends PureComponent {
  componentDidMount = async () => {
    const {
      getProfileByHandle,
      match: {
        params: { handle }
      }
    } = this.props;

    getProfileByHandle(handle);
  };

  componentDidUpdate = ({ profile: { loading } }) => {
    const {
      profile: { profile },
      history
    } = this.props;
    if (profile === null && loading) {
      history.push('/notfound');
    }
  };

  render() {
    const {
      profile: { profile, loading }
    } = this.props;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back to profiles
              </Link>
            </div>
          </div>

          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds education={profile.education} experience={profile.experience} />
          {profile.githubUsername && <ProfileGithub username={profile.githubUsername} />}
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="col-12">{profileContent}</div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  getProfileByHandle: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});
const mapDispatchToProps = {
  getProfileByHandle
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

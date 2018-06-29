import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../commons/Spinner';
import { getProfiles } from '../../actions/profileActions';
import ProfileItem from './ProfileItem';

class Profiles extends PureComponent {
  componentDidMount = () => {
    const { getProfiles } = this.props;

    getProfiles();
  };

  render() {
    const {
      profile: { profiles, loading }
    } = this.props;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else if (profiles.length > 0) {
      profileItems = profiles.map(profile => <ProfileItem key={profile._id} profile={profile} />);
    } else {
      profileItems = <h4>No profile found</h4>;
    }

    return (
      <div className="profiles">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4 text-center">Developer Profiles</h1>
            <p className="lead text-center">Browse and connect with developers</p>
            {profileItems}
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStatetToProps = state => ({
  profile: state.profile
});

const mapDispatchToProps = {
  getProfiles
};

export default connect(
  mapStatetToProps,
  mapDispatchToProps
)(Profiles);

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../commons/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

class Dashboard extends PureComponent {
  componentDidMount = () => {
    const { getCurrentProfile } = this.props;

    getCurrentProfile();
  };

  handleDeleteClick = () => {
    const { deleteAccount } = this.props;

    deleteAccount();
  };

  render() {
    // Destructuring to get profile and loading properties from this.props.profile
    const {
      user,
      profile: { profile, loading }
    } = this.props;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else if (Object.keys(profile).length > 0) {
      // If user has profile => display profile
      dashboardContent = (
        <div>
          <p className="lead text-muted">
            Welcome <Link to={`/profile/${profile.handle}`}> {user.info.name}</Link>
          </p>
          <DashboardActions />
          <Experience experiences={profile.experience} />
          <Education education={profile.education} />
          <button type="button" className="btn btn-danger mt-5" onClick={this.handleDeleteClick}>
            Delete my account
          </button>
        </div>
      );
    } else {
      // Else create profile
      dashboardContent = (
        <div>
          <p> Please set up your profile.</p>
          <Link to="/create-profile" className="btn btn-lg btn-info">
            {' '}
            Create Profile
          </Link>
        </div>
      );
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  profile: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  user: state.user
});
const mapDispatchToProps = {
  getCurrentProfile,
  deleteAccount
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

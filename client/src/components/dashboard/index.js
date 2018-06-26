import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../commons/Spinner';

class Dashboard extends PureComponent {
  componentDidMount = () => {
    this.props.getCurrentProfile();
  };

  render() {
    // Destructuring to get info property from this.props.user
    const { user } = this.props;
    // Destructuring to get profile and loading properties from this.props.profile
    const {
      profile: { profile, loading }
    } = this.props;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else if (Object.keys(profile).length > 0) {
      // If user has profile => display profile
      dashboardContent = <h3>Display profile</h3>;
    } else {
      // Else create profile
      dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome {user.info.name}</p>
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
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  profile: PropTypes.objectOf(PropTypes.any).isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  user: state.user
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);

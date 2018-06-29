import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile, createProfile } from '../../actions/profileActions';
import { changeInput, getErrors, toggleDisplaySocial } from '../../utils/stateChanges';
import InputField from '../commons/InputField';
import SelectList from '../commons/SelectList';
import TextArea from '../commons/TextArea';
import InputFieldSocial from '../commons/InputFieldSocial';
import options from '../commons/statusOptions';

class EditProfile extends PureComponent {
  state = {
    displaySocial: false,
    handle: '',
    company: '',
    website: '',
    status: '',
    location: '',
    skills: '',
    githubUsername: '',
    bio: '',
    twitter: '',
    facebook: '',
    youtube: '',
    linkedin: '',
    instagram: '',
    errors: {}
  };

  componentDidMount = async () => {
    const { getCurrentProfile } = this.props;
    await getCurrentProfile();

    // Destruct to get all profile properties inside profile object inside props
    // Then remove unneeded properties by using rest and get profileData and social only
    // Don't ask questions, it's magic
    const {
      profile: {
        profile: { user, __v, _id, social, ...profileData }
      }
    } = this.props;

    // spread data and social, and join skills (is array)
    this.setState(() => ({
      ...profileData,
      ...social,
      skills: profileData.skills.join(',')
    }));
  };

  componentDidUpdate = (prevProps) => {
    const { errors } = this.props;

    if (errors !== prevProps.errors) {
      this.setState(getErrors(errors));
    }
  };

  handleInputChange = (e) => {
    e.persist();
    this.setState(changeInput(e));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { displaySocial, errors, ...profileData } = this.state;
    const { createProfile, history } = this.props;

    createProfile(profileData, history);
  };

  handleButtonClick = () => {
    this.setState(toggleDisplaySocial);
  };

  render() {
    const {
      displaySocial,
      handle,
      company,
      website,
      status,
      location,
      skills,
      githubUsername,
      bio,
      twitter,
      facebook,
      youtube,
      linkedin,
      instagram,
      errors
    } = this.state;

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Your Profile</h1>
              <p className="lead text-center">
                {"Let's"} get some information to make your profile stand out
              </p>
              <form noValidate onSubmit={this.handleSubmit}>
                <InputField
                  type="text"
                  placeholder="* Profile Handle"
                  name="handle"
                  info="A unique handle for your profile URL. Your full name, company name, nickname, etc"
                  value={handle}
                  error={errors.handle}
                  onChange={this.handleInputChange}
                  disabled
                />
                <SelectList
                  name="status"
                  value={status}
                  info="Give us an idea of where you are at in your career"
                  error={errors.status}
                  onChange={this.handleInputChange}
                  options={options}
                />
                <InputField
                  type="text"
                  placeholder="Company"
                  name="company"
                  info="Could be your own company or one you work for"
                  value={company}
                  onChange={this.handleInputChange}
                />
                <InputField
                  type="text"
                  placeholder="Website"
                  name="website"
                  info="Could be your own or a company website"
                  value={website}
                  error={errors.website}
                  onChange={this.handleInputChange}
                />
                <InputField
                  type="text"
                  placeholder="Location"
                  name="location"
                  info="City & state suggested (eg. Boston, MA)"
                  value={location}
                  onChange={this.handleInputChange}
                />
                <InputField
                  type="text"
                  placeholder="* Skills"
                  name="skills"
                  info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                  value={skills}
                  error={errors.skills}
                  onChange={this.handleInputChange}
                />
                <InputField
                  type="text"
                  placeholder="Github Username"
                  name="githubUsername"
                  info="If you want your latest repos and a Github link, include your username"
                  value={githubUsername}
                  onChange={this.handleInputChange}
                />
                <TextArea
                  placeholder="A short bio of yourself"
                  name="bio"
                  info="Tell us a little about yourself"
                  value={bio}
                  onChange={this.handleInputChange}
                />

                <div className="mb-3">
                  <button type="button" className="btn btn-light" onClick={this.handleButtonClick}>
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>

                {displaySocial && (
                  <div>
                    <InputFieldSocial
                      type="text"
                      placeholder="Twitter profile"
                      name="twitter"
                      icon="fab fa-twitter"
                      value={twitter}
                      onChange={this.handleInputChange}
                      error={errors.twitter}
                    />
                    <InputFieldSocial
                      type="text"
                      placeholder="Facebook profile"
                      name="facebook"
                      icon="fab fa-facebook"
                      value={facebook}
                      onChange={this.handleInputChange}
                      error={errors.facebook}
                    />
                    <InputFieldSocial
                      type="text"
                      placeholder="Youtube profile"
                      name="youtube"
                      icon="fab fa-youtube"
                      value={youtube}
                      onChange={this.handleInputChange}
                      error={errors.youtube}
                    />
                    <InputFieldSocial
                      type="text"
                      placeholder="LinkedIn profile"
                      name="linkedin"
                      icon="fab fa-linkedin"
                      value={linkedin}
                      onChange={this.handleInputChange}
                      error={errors.linkedin}
                    />
                    <InputFieldSocial
                      type="text"
                      placeholder="Instagram profile"
                      name="instagram"
                      icon="fab fa-instagram"
                      value={instagram}
                      onChange={this.handleInputChange}
                      error={errors.instagram}
                    />
                  </div>
                )}
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  profile: PropTypes.objectOf(PropTypes.any).isRequired,
  errors: PropTypes.objectOf(PropTypes.any).isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
const mapDispatchToProps = {
  getCurrentProfile,
  createProfile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditProfile));

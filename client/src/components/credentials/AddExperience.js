import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import InputField from '../commons/InputField';
import TextArea from '../commons/TextArea';
import { changeInput, getErrors, toggleCheck } from '../../utils/stateChanges';
import { createExperience } from '../../actions/profileActions';

class AddExperience extends PureComponent {
  state = {
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
    disabled: false,
    errors: {}
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { errors } = this.props;
    const { current } = this.state;

    if (errors !== prevProps.errors) {
      this.setState(getErrors(errors));
    }

    if (current !== prevState.current) {
      this.setState(() => ({ to: '' }));
    }
  };

  handleInputChange = (e) => {
    e.persist();
    this.setState(changeInput(e));
  };

  handleToggle = () => {
    this.setState(toggleCheck);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { disabled, errors, ...experienceData } = this.state;
    const { history, createExperience } = this.props;

    createExperience(experienceData, history);
  };

  render() {
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
      disabled,
      errors
    } = this.state;

    return (
      <div className="section add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Experience</h1>
              <p className="lead text-center">
                Add any developer/programming positions that you have had in the past
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form noValidate onSubmit={this.handleSubmit}>
                <InputField
                  type="text"
                  placeholder="* Job Title"
                  name="title"
                  value={title}
                  error={errors.title}
                  onChange={this.handleInputChange}
                />
                <InputField
                  type="text"
                  placeholder="* Company"
                  name="company"
                  value={company}
                  error={errors.company}
                  onChange={this.handleInputChange}
                />
                <InputField
                  type="text"
                  placeholder="Location"
                  name="location"
                  value={location}
                  error={errors.location}
                  onChange={this.handleInputChange}
                />
                <h6>From Date</h6>
                <InputField
                  type="date"
                  name="from"
                  value={from}
                  error={errors.from}
                  onChange={this.handleInputChange}
                />
                <h6>To Date</h6>
                <InputField
                  type="date"
                  name="to"
                  value={to}
                  error={errors.to}
                  onChange={this.handleInputChange}
                  disabled={disabled}
                />
                <div className="form-check mb-4">
                  <label className="form-check-label" htmlFor="current">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="current"
                      id="current"
                      value={current}
                      onChange={this.handleToggle}
                    />
                    Current Job
                  </label>
                </div>
                <TextArea
                  placeholder="Job Description"
                  value={description}
                  name="description"
                  info="Some of your responsabilities, etc"
                  onChange={this.handleInputChange}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddExperience.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  errors: PropTypes.objectOf(PropTypes.any).isRequired,
  createExperience: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ errors: state.errors });

const mapDispatchToProps = { createExperience };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddExperience));

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import InputField from '../commons/InputField';
import TextArea from '../commons/TextArea';
import { changeInput, getErrors, toggleCheck } from '../../utils/stateChanges';
import { createEducation } from '../../actions/profileActions';

class AddEducation extends PureComponent {
  state = {
    degree: '',
    school: '',
    field: '',
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
    this.setState(changeInput(e));
  };

  handleToggle = () => {
    this.setState(toggleCheck);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { disabled, errors, ...education } = this.state;
    const { history, createEducation } = this.props;

    createEducation(education, history);
  };

  render() {
    const { school, degree, field, from, to, current, description, disabled, errors } = this.state;

    return (
      <div className="section add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp, etc that you have attended or are attending
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form noValidate onSubmit={this.handleSubmit}>
                <InputField
                  type="text"
                  placeholder="* School Or Bootcamp"
                  name="school"
                  value={school}
                  error={errors.school}
                  onChange={this.handleInputChange}
                />
                <InputField
                  type="text"
                  placeholder="* Degree Or Certificate"
                  name="degree"
                  value={degree}
                  error={errors.degree}
                  onChange={this.handleInputChange}
                />
                <InputField
                  type="text"
                  placeholder="* Field Of Study"
                  name="field"
                  value={field}
                  error={errors.field}
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
                    Is Current
                  </label>
                </div>
                <TextArea
                  placeholder="Program Description"
                  value={description}
                  name="description"
                  info="Tell us about your experience and what you learned"
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

AddEducation.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  errors: PropTypes.objectOf(PropTypes.any).isRequired,
  createEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ errors: state.errors });

const mapDispatchToProps = { createEducation };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddEducation));

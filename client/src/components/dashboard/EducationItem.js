import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { deleteEducation } from '../../actions/profileActions';

const EducationItem = (props) => {
  const {
    deleteEducation,
    education: { school, degree, field, from, to, _id }
  } = props;

  const handleDeleteEducation = () => {
    deleteEducation(_id);
  };

  return (
    <tr>
      <td>{school}</td>
      <td>{degree}</td>
      <td>
        {moment(from).format('DD/MM/YYYY')} - {to ? moment(to).format('DD/MM/YYYY') : 'Now'}
      </td>
      <td>
        <button
          type="button"
          className="btn btn-danger float-right mr-lg-4"
          onClick={handleDeleteEducation}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

EducationItem.propTypes = {
  education: PropTypes.objectOf(PropTypes.any).isRequired,
  deleteEducation: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  deleteEducation
};

export default connect(
  undefined,
  mapDispatchToProps
)(EducationItem);

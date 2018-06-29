import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { deleteExperience } from '../../actions/profileActions';

const ExperienceItem = (props) => {
  const {
    deleteExperience,
    experience: { company, title, to, from, _id }
  } = props;

  const handleDeleteExperience = () => {
    deleteExperience(_id);
  };

  return (
    <tr>
      <td>{company}</td>
      <td>{title}</td>
      <td>
        {moment(from).format('DD/MM/YYYY')} - {to ? moment(to).format('DD/MM/YYYY') : 'Now'}
      </td>
      <td>
        <button
          type="button"
          className="btn btn-danger float-right mr-lg-4"
          onClick={handleDeleteExperience}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

ExperienceItem.propTypes = {
  experience: PropTypes.objectOf(PropTypes.any).isRequired,
  deleteExperience: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  deleteExperience
};

export default connect(
  undefined,
  mapDispatchToProps
)(ExperienceItem);

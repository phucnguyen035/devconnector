import React from 'react';
import PropTypes from 'prop-types';
import EducationItem from './EducationItem';

const Education = (props) => {
  const { education } = props;

  return (
    <div>
      <h4>Education Credentials</h4>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr className="table-active">
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{education.map(edu => <EducationItem key={edu._id} education={edu} />)}</tbody>
        </table>
      </div>
    </div>
  );
};

Education.propTypes = {
  education: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Education;

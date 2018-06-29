import React from 'react';
import PropTypes from 'prop-types';
import ExperienceItem from './ExperienceItem';

const Experience = ({ experiences }) => (
  <div>
    <h4>Experience Credentials</h4>
    <div className="table-responsive">
      <table className="table">
        <thead className="table-active">
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences.map(exp => <ExperienceItem key={exp._id} experience={exp} />)}</tbody>
      </table>
    </div>
  </div>
);

Experience.propTypes = {
  experiences: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Experience;

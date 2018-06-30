import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const ProfileCreds = ({ experience, education }) => {
  // Experience Items
  const expItems = experience.map(exp => (
    <li key={exp._id} className="list-group-item">
      <h4>{exp.company}</h4>

      <p>
        {moment(exp.from).format('DD/MM/YYYY')} -{' '}
        {exp.to ? moment(exp.to).format('DD/MM/YYYY') : 'Now'}
      </p>

      <p>
        <span className="font-weight-bold">Position:</span> {exp.title}
      </p>

      {exp.location && (
        <p>
          <span className="font-weight-bold">Location:</span> {exp.location}
        </p>
      )}

      {exp.description && (
        <p>
          <span className="font-weight-bold">Description:</span> {exp.description}
        </p>
      )}
    </li>
  ));

  const experiences = expItems.length > 0 ? (
    <ul className="list-group">{expItems}</ul>
  ) : (
    <p className="text-center">No Experience Listed</p>
  );

  // Education Items
  const eduItems = education.map(edu => (
    <li key={edu._id} className="list-group-item">
      <h4>{edu.school}</h4>

      <p>
        {moment(edu.from).format('DD/MM/YYYY')} -{' '}
        {edu.to ? moment(edu.to).format('DD/MM/YYYY') : 'Now'}
      </p>

      <p>
        <span className="font-weight-bold">Degree:</span> {edu.degree}
      </p>

      <p>
        <span className="font-weight-bold">Field of Study:</span> {edu.field}
      </p>

      {edu.description && (
        <p>
          <span className="font-weight-bold">Description:</span> {edu.description}
        </p>
      )}
    </li>
  ));

  const pastEducation = eduItems.length > 0 ? (
    <ul className="list-group">{eduItems}</ul>
  ) : (
    <p className="text-center">No Education Listed</p>
  );

  return (
    <div className="row">
      <div className="col md-6">
        <h3 className="text-center text-info">Experience</h3>

        {experiences}
      </div>
      <div className="col md-6">
        <h3 className="text-center text-info">Education</h3>

        {pastEducation}
      </div>
    </div>
  );
};

ProfileCreds.propTypes = {
  experience: PropTypes.arrayOf(PropTypes.any).isRequired,
  education: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default ProfileCreds;

import React from 'react';
import PropTypes from 'prop-types';
import '../styles/style.css';

const ReviewEntry = ({ userId, overallScore, foodScore, serviceScore, ambienceScore, review }) => {
  return (
    <div className="review-container">
      <div className="cell userCell">{userId}</div>
      <span className="cell scoreCell">
        Overall {overallScore} Food {foodScore} Service {serviceScore} Ambience {ambienceScore}
      </span>
      <div className="cell reviewCell">{review}</div>
    </div>
  );
};

// ReviewEntry.propTypes = {
//   reviews: PropTypes.arrayOf.isRequired,
// };

export default ReviewEntry;

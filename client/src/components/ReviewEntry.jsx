import React from 'react';
import PropTypes from 'prop-types';
import '../styles/style.css';
import redstar from '../redstar.png';
import graystar from '../graystar.png';
import UserEntry from './UserEntry.jsx'

const ReviewEntry = ({ userId, overallScore, foodScore, serviceScore, ambienceScore, review }) => {
  return (
    <div className="reviews-container">
      <div className="reviews-user-cell">{userId}</div>
      <div>
        <span className="reviews-review-stars"><img src={redstar} alt="red star" height="16" width="auto" /></span>
        <span className="reviews-review-stars"><img src={redstar} alt="red star" height="16" width="auto" /></span>
        <span className="reviews-review-stars"><img src={redstar} alt="red star" height="16" width="auto" /></span>
        <span className="reviews-review-stars"><img src={redstar} alt="red star" height="16" width="auto" /></span>
        <span className="reviews-review-stars"><img src={graystar} alt="gray star" height="16" width="auto" /></span>
        <span className="reviews-review-date">January 10, 2019</span>
      </div>
      <div className="reviews-score-cell">
        <span className="reviews-score-category">Overall</span>
        <span className="reviews-score-num">{overallScore}</span>
        <span className="reviews-score-category">Food</span>
        <span className="reviews-score-num">{foodScore}</span>
        <span className="reviews-score-category">Service</span>
        <span className="reviews-score-num">{serviceScore}</span>
        <span className="reviews-score-category">Ambience</span>
        <span className="reviews-score-num">{ambienceScore}</span>
      </div>
      <p className="reviews-review-cell">{review}</p>
    </div>
  );
};

// ReviewEntry.propTypes = {
//   reviews: PropTypes.arrayOf.isRequired,
// };

export default ReviewEntry;

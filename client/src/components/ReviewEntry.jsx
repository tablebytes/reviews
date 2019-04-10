import React from 'react';
import PropTypes from 'prop-types';
import '../styles/reviewStyle.css';
import moment from 'moment';
import redstar from '../../dist/images/redstar.png';
import graystar from '../../dist/images/graystar.png';
import UserEntry from './UserEntry.jsx';


const ReviewEntry = ({
  userData, overallScore, foodScore, serviceScore, ambienceScore, dateDined, review 
}) => {
  const red = <span className="reviews-review-stars"><img src={redstar} alt="red star" height="16" width="auto" /></span>;
  const gray = <span className="reviews-review-stars"><img src={graystar} alt="gray star" height="16" width="auto" /></span>;
  let starCounts = [red, red, red, red, red];
  if (overallScore === 4) {
    starCounts = [red, red, red, red, gray];
  } else if (overallScore === 3) {
    starCounts = [red, red, red, gray, gray];
  } else if (overallScore === 2) {
    starCounts = [red, red, gray, gray, gray];
  } else if (overallScore === 1) {
    starCounts = [red, gray, gray, gray, gray];
  }
  return (
    <div className="reviews-container">
      <div className="reviews-user-cell">
        <UserEntry userData={userData} />
      </div>
      <div>
        <span>{starCounts}</span>
        <span className="reviews-review-date">{`Dined on ${moment(dateDined).format('MMMM D, YYYY')}`}</span>
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

export default ReviewEntry;

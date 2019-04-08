import React from 'react';
import '../styles/summaryStyle.css';
import ScoreChart from './ScoreChart.jsx';

const RatingSummary = (props) => {
  return (
    <div className="reviews-summary">
      <span className="reviews-summary-heading">What 131 People Are Saying</span>
      <div>
        <span className="reviews-summary-heading-2">Overall ratings and reviews</span>
        <span className="reviews-summary-heading-3">
          Reviews can only be made by diners who have eaten at this restaurant
        </span>
        <div className="reviews-summary-stars-section">
          <div className="reviews-summary-stars">*  *  *  *  *</div>
          <div className="reviews-summary-stars-text">
            <span>4.6</span>
            <span>based on recent ratings</span>
          </div>
        </div>
        <div className="reviews-summary-scores-section">
          <div className="reviews-summary-score">
            <div className="reviews-summary-category-score">4.7</div>
            <div className="reviews-summary-category-text">Food</div>
          </div>
          <div className="reviews-summary-score">
            <div className="reviews-summary-category-score">4.5</div>
            <div className="reviews-summary-category-text">Service</div>
          </div>
          <div className="reviews-summary-score">
            <div className="reviews-summary-category-score">4.3</div>
            <div className="reviews-summary-category-text">Ambience</div>
          </div>
          <div className="reviews-summary-score">
            <div className="reviews-summary-category-score">4.2</div>
            <div className="reviews-summary-category-text">Value</div>
          </div>
        </div>
      </div>
      <div className="reviews-summary-chart">
        <ScoreChart scores={props} />
      </div>
    </div>
  );
};

export default RatingSummary;

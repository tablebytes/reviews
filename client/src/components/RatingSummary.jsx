import React from 'react';
import '../styles/summaryStyle.css';
import ScoreChart from './ScoreChart.jsx';
import redstar from '../redstar.png';
import graystar from '../graystar.png';
import noisebar from '../noisebar.png';
import thumbsup from '../thumbsup.png';

const RatingSummary = (props) => {
  const { reviews, origReviews, handleChartClick } = props;
  const red = <span className="reviews-review-stars"><img src={redstar} alt="red star" height="16" width="16" /></span>;
  const gray = <span className="reviews-review-stars"><img src={graystar} alt="gray star" height="16" width="auto" /></span>;
  const noise = <span className="reviews-icon"><img src={noisebar} alt="noise icon" height="16" width="auto" /></span>;
  const thumb = <span className="reviews-icon"><img src={thumbsup} alt="thumb icon" height="16" width="auto" /></span>;
  const reviewCount = origReviews.length;

  const sumOverall = origReviews.reduce(((prev, curr) => prev + curr.overall_score), 0);
  const sumFood = origReviews.reduce(((prev, curr) => prev + curr.food_score), 0);
  const sumService = origReviews.reduce(((prev, curr) => prev + curr.service_score), 0);
  const sumAmbience = origReviews.reduce(((prev, curr) => prev + curr.ambience_score), 0);
  const sumValue = origReviews.reduce(((prev, curr) => prev + curr.value_score), 0);
  const avgOverall = Math.round((sumOverall / reviewCount) * 10) / 10;
  const avgFood = Math.round((sumFood / reviewCount) * 10) / 10;
  const avgService = Math.round((sumService / reviewCount) * 10) / 10;
  const avgAmbience = Math.round((sumAmbience / reviewCount) * 10) / 10;
  const avgValue = Math.round((sumValue / reviewCount) * 10) / 10;

  return (
    <div className="reviews-summary">
      <span className="reviews-summary-heading">
        {`What ${reviewCount} People Are Saying`}
      </span>
      <div>
        <span className="reviews-summary-heading-2">Overall ratings and reviews</span>
        <span className="reviews-summary-heading-3">
          Reviews can only be made by diners who have eaten at this restaurant
        </span>
        <div className="reviews-summary-stars-section">
          <div className="reviews-summary-stars">
            <span>{[red, red, red, red, gray]}</span>
          </div>
          <div className="reviews-summary-stars-text">
            <span>{avgOverall}</span>
            <span>based on recent ratings</span>
          </div>
        </div>
        <div className="reviews-summary-scores-section">
          <div className="reviews-summary-score">
            <div className="reviews-summary-category-score">{avgFood}</div>
            <div className="reviews-summary-category-text">Food</div>
          </div>
          <div className="reviews-summary-score">
            <div className="reviews-summary-category-score">{avgService}</div>
            <div className="reviews-summary-category-text">Service</div>
          </div>
          <div className="reviews-summary-score">
            <div className="reviews-summary-category-score">{avgAmbience}</div>
            <div className="reviews-summary-category-text">Ambience</div>
          </div>
          <div className="reviews-summary-score">
            <div className="reviews-summary-category-score">{avgValue}</div>
            <div className="reviews-summary-category-text">Value</div>
          </div>
        </div>
      </div>
      <div className="noise-thumb-outer">
        <div className="noise-thumb-inner">
          <div>{noise}</div>
          <div className="noise-thumb-text-line">
            <span className="noise-thumb-emphasized">Noise · </span>
            <span>Moderate</span>
          </div>
        </div>
      </div>
      <div className="noise-thumb-outer">
        <div className="noise-thumb-inner">
          <div>{thumb}</div>
          <div className="noise-thumb-text-line">
            <span className="noise-thumb-emphasized">85% of people </span>
            <span>would recommend it to a friend</span>
          </div>
        </div>
      </div>
      <div className="reviews-summary-chart">
        <ScoreChart
          scores={reviews}
          origReviews={origReviews}
          handleChartClick={handleChartClick}
        />
      </div>
    </div>
  );
};

export default RatingSummary;

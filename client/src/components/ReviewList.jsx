import React from 'react';
import ReviewEntry from './ReviewEntry.jsx'

const ReviewList = ({ reviews }) => (
  <div>
    {reviews.map(review => (
      <ReviewEntry
        key={review.id}
        overallScore={review.overall_score}
        foodScore={review.food_score}
        serviceScore={review.service_score}
        ambienceScore={review.ambience_score}
        valueScore={review.value_score}
        dateDined={review.date_dined}
        review={review.review}
        userData={review.User}
      />
    ))}
  </div>
);

export default ReviewList;

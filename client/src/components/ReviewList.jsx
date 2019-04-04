import React from 'react';
import ReviewEntry from './ReviewEntry.jsx'

const ReviewList = ({ reviews }) => (
  <div>
    {reviews.map(review => (
      <ReviewEntry
        key={review.id}
        userId={review.user_id}
        overallScore={review.overall_score}
        foodScore={review.food_score}
        serviceScore={review.service_score}
        ambienceScore={review.ambience_score}
        valueScore={review.value_score}
        dateDined={review.date_dined}
        review={review.review}
      // DID NOT BRING IN USER_RECOMMENDED HERE; USE IT TO CALC PERCENTAGE IN OTHER COMPONENT
      />
    ))}
  </div>
);

export default ReviewList;

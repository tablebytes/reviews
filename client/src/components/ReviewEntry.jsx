import React from 'react';
import PropTypes from 'prop-types';


const ReviewEntry = ({ review }) => (
  <div>
    {review}
  </div>
);

// ReviewEntry.propTypes = {
//   reviews: PropTypes.arrayOf.isRequired,
// };

export default ReviewEntry;

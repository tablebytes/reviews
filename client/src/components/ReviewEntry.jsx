import React from 'react';
import PropTypes from 'prop-types';
import '../styles/style.css';

const ReviewEntry = ({ userId, review }) => {
  // const styles = {
  //   fontFamily: 'Helvetica',
  //   fontSize: '12px',
  //   border: '1px solid #d8d9db',
  // };
  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '10px',
    gridAutoRows: 'minMax(100px, auto)',
  };

  return (
    <div className="review-container">
      <div className="cell userCell">{userId}</div>
      <div className="cell reviewCell">{review}</div>
    </div>
  );
};

// ReviewEntry.propTypes = {
//   reviews: PropTypes.arrayOf.isRequired,
// };

export default ReviewEntry;

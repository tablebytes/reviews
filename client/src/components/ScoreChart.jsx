import React from 'react';
import '../styles/summaryStyle.css';
import { Progress } from 'reactstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import PropTypes from 'prop-types';

const ScoreChart = (props) => {
  return (
    <div>
      <div className="row">
        <div className="chart-score-label">5</div>
        <ProgressBar className="bar bar-5" variant="danger" now={70} />
        <div className="chart-score-label">4</div>
        <ProgressBar className="bar bar-5" variant="danger" now={20} />
      </div>
    </div>
  );
};

export default ScoreChart;

// ProgressBar.propTypes = {
//   multi: PropTypes.bool,
//   bar: PropTypes.bool, // used in combination with multi
//   tag: PropTypes.string,
//   value: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.number,
//   ]),
//   max: PropTypes.oneOf([
//     PropTypes.string,
//     PropTypes.number,
//   ]),
//   animated: PropTypes.bool,
//   striped: PropTypes.bool,
//   color: PropTypes.string,
//   className: PropTypes.string,
//   barClassName: PropTypes.string, // used to add class to the inner progress-bar element
// };

// ProgressBar.defaultProps = {
//   tag: 'progress',
//   value: 0,
//   max: 100,
// };

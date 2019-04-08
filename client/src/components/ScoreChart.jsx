import React from 'react';
import '../styles/scoreChart.css';

const ScoreChart = (props) => {
  return (
    <div className="chart">
      <div className="chart-row">
        <div className="chart-label"><span>5</span></div>
        <div className="bar-container">
          <div className="bar-5" />
        </div>
      </div>
      <div className="chart-row">
        <div className="chart-label"><span>4</span></div>
        <div className="bar-container">
          <div className="bar-4" />
        </div>
      </div>
      <div className="chart-row">
        <div className="chart-label"><span>3</span></div>
        <div className="bar-container">
          <div className="bar-3" />
        </div>
      </div>
      <div className="chart-row">
        <div className="chart-label"><span>2</span></div>
        <div className="bar-container">
          <div className="bar-2" />
        </div>
      </div>
      <div className="chart-row">
        <div className="chart-label"><span>1</span></div>
        <div className="bar-container">
          <div className="bar-1" />
        </div>
      </div>
    </div>
  );
};

export default ScoreChart;

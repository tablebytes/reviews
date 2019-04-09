import React from 'react';
import '../styles/scoreChart.css';

const ScoreChart = (props) => {
  return (
    <div className="chart">
      <div className="chart-row"
        onClick={e => props.handleChartClick(e, 5)} role="button">
        <div className="chart-label"><span>5</span></div>
        <div className="bar-container">
          <div className="bar-5" />
        </div>
      </div>
      <div className="chart-row"
        onClick={e => props.handleChartClick(e, 4)} role="button">
        <div className="chart-label"><span>4</span></div>
        <div className="bar-container">
          <div className="bar-4" />
        </div>
      </div>
      <div className="chart-row"
        onClick={e => props.handleChartClick(e, 3)} role="button">
        <div className="chart-label"><span>3</span></div>
        <div className="bar-container">
          <div className="bar-3" />
        </div>
      </div>
      <div className="chart-row"
        onClick={e => props.handleChartClick(e, 2)} role="button">
        <div className="chart-label"><span>2</span></div>
        <div className="bar-container">
          <div className="bar-2" />
        </div>
      </div>
      <div className="chart-row"
        onClick={e => props.handleChartClick(e, 1)} role="button">
        <div className="chart-label"><span>1</span></div>
        <div className="bar-container">
          <div className="bar-1" />
        </div>
      </div>
    </div>
  );
};

export default ScoreChart;

import React from 'react';
import '../styles/scoreChart.css';

const ScoreChart = ({ scores, origReviews, handleChartClick }) => {

  const pct5 = Math.round((origReviews.filter(el => el.overall_score === 5).length / origReviews.length) * 100);
  const pct4 = Math.round((origReviews.filter(el => el.overall_score === 4).length / origReviews.length) * 100);
  const pct3 = Math.round((origReviews.filter(el => el.overall_score === 3).length / origReviews.length) * 100);
  const pct2 = Math.round((origReviews.filter(el => el.overall_score === 2).length / origReviews.length) * 100);
  const pct1 = Math.round((origReviews.filter(el => el.overall_score === 1).length / origReviews.length) * 100);

  document.documentElement.style.setProperty('--width-5', `${pct5}%`);
  document.documentElement.style.setProperty('--width-4', `${pct4}%`);
  document.documentElement.style.setProperty('--width-3', `${pct3}%`);
  document.documentElement.style.setProperty('--width-2', `${pct2}%`);
  document.documentElement.style.setProperty('--width-1', `${pct1}%`);

  return (
    <div className="chart">
      <div className="chart-row"
        onClick={e => handleChartClick(e, 5)} role="button">
        <div className="chart-label"><span>5</span></div>
        <div className="bar-container">
          <div className="bar-5" />
        </div>
      </div>
      <div className="chart-row"
        onClick={e => handleChartClick(e, 4)} role="button">
        <div className="chart-label"><span>4</span></div>
        <div className="bar-container">
          <div className="bar-4" />
        </div>
      </div>
      <div className="chart-row"
        onClick={e => handleChartClick(e, 3)} role="button">
        <div className="chart-label"><span>3</span></div>
        <div className="bar-container">
          <div className="bar-3" />
        </div>
      </div>
      <div className="chart-row"
        onClick={e => handleChartClick(e, 2)} role="button">
        <div className="chart-label"><span>2</span></div>
        <div className="bar-container">
          <div className="bar-2" />
        </div>
      </div>
      <div className="chart-row"
        onClick={e => handleChartClick(e, 1)} role="button">
        <div className="chart-label"><span>1</span></div>
        <div className="bar-container">
          <div className="bar-1" />
        </div>
      </div>
    </div>
  );
};

export default ScoreChart;

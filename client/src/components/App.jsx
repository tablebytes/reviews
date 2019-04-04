import React from 'react';
import exampleReviewData from '../exampleReviewData.js';
import ReviewList from './ReviewList.jsx'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurantId: '',
      reviews: [],
    };
  }

  componentDidMount() {
    this.setState({
      restaurantId: 1,
      reviews: exampleReviewData,
    });
  }

  render() {
    console.log(this.state.reviews)
    return (
      <div>
        <ReviewList reviews={this.state.reviews} />
      </div>
    );
  }
}

export default App;

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
  // componentDidMount() {
  //   this.getReviews('react tutorials');
  // }

  // getReviews(query) {
  //   const options = {
  //     key: this.props.API_KEY,
  //     query,
  //   };

  //   this.props.searchYouTube(options, videos => this.setState({
  //     videos,
  //     currentVideo: videos[0],
  //   }));
  // }

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

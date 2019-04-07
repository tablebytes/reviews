import React from 'react';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';
import exampleReviewData from '../exampleReviewData.js';
import ReviewList from './ReviewList.jsx'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurantId: 4,
      reviews: [],
    };
  }

  componentDidMount() {
    this.getReviews();
  }

  getReviews() {
    const searchId = window.location;
    console.log(searchId);
    fetch(`http://127.0.0.1:3000/api/restaurants/${this.state.restaurantId}/reviews`)
    // fetch(`http://localhost:3000/api/restaurants/4/reviews`)
    // fetch(`/api/restaurants/searchId`)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          restaurantId: 2,
          reviews: data,
        });
        console.log('hiya');
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/api/restaurants/:id/reviews" component={ReviewList} />
          <ReviewList reviews={this.state.reviews} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

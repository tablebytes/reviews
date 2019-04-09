import React from 'react';
import {
  BrowserRouter,
  Route,
} from 'react-router-dom';
import ReviewList from './ReviewList.jsx'
import RatingSummary from './RatingSummary.jsx'

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
      .then(response => response.json())
      .then((data) => {
        this.setState({
          restaurantId: 2,
          reviews: data,
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/api/restaurants/:id/reviews" component={ReviewList} />
          <RatingSummary reviews={this.state.reviews} />
          <ReviewList reviews={this.state.reviews} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

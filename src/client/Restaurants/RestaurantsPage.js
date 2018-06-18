/* eslint-disable */
import React, { Component } from 'react';

class RestaurantsPage extends Component {

  render() {
    const renderRestaurants = this.props.restaurantsList.map((restaurant, index) => {
      return (
        <tr key={restaurant.id}>
          <td>{restaurant.name}</td>
          <td>{restaurant.display_hours}</td>
        </tr>
      );
    });

    return (
      <div>
        <h1>Restaurants</h1>
        <table>
          <tr style={{ textAlign: 'left' }}>
            <th>Name</th>
            <th>Opening Hours</th>
          </tr>
          {renderRestaurants}
        </table>
      </div>
    )
  }
}

export default RestaurantsPage;
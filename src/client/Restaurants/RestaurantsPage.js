/* eslint-disable */
import React, { Component } from 'react';

class RestaurantsPage extends Component {

  render() {
    const renderDays = this.props.days.map((day) => {
      return (
        <option key={day.id} value={day.id}>{day.name}</option>
      );
    });

    const renderOpeningHours = this.props.openingHours.map((openingHour) => {
      return (
        <option key={openingHour.start_time_id} value={openingHour.start_time_id}>{String(openingHour.hour).padStart(2, '0')}:{openingHour.min}{openingHour.am_pm}</option>
      );
    });

    const renderRestaurants = this.props.restaurantsList.length == 0 ?
    (<tr>
       <td style={{ padding: '15px' }}></td>
       <td style={{ padding: '15px' }}></td>
     </tr>
    ) : (this.props.restaurantsList.map((restaurant) => {
          return (
            <tr key={restaurant.id}>
              <td style={{ padding: '15px' }}>{restaurant.name}</td>
              <td style={{ padding: '15px' }}>{restaurant.display_hours}</td>
            </tr>
          )
        })
    )

    return (
      <div>
        <h1>Restaurants</h1>
        <div style={{ margin: '50px 0' }}>
          <label>Search by Day: </label>
          <select onChange={(e) => {this.props.handleDaysChange(e.target.value)}}>
            <option key="-1" value="-1">All</option>
            {renderDays}
          </select><span> </span>
          <label>Search by Opening Time: </label>
          <select onChange={(e) => {this.props.handleOpeningHoursChange(e.target.value)}}>
            <option key="-1" value="-1">All</option>
            {renderOpeningHours}
          </select>
        </div>
        <table>
          <tbody>
            <tr style={{ textAlign: 'left' }}>
              <th style={{ padding: '15px' }} >Name</th>
              <th style={{ padding: '15px' }}>Opening Hours</th>
            </tr>
            {renderRestaurants}
          </tbody>
        </table>
      </div>
    )
  }
}

export default RestaurantsPage;
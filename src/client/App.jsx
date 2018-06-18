/* eslint-disable */
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import RestaurantsPage from './Restaurants/RestaurantsPage';
import CollectionsPage from './Collections/CollectionsPage';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      days: [],
      openingHours: [],
      restaurantsList: [],
      selectedDay: -1,
      selectedOpeningHour: -1
    };
    this.handleDaysChange = this.handleDaysChange.bind(this);
    this.handleOpeningHoursChange = this.handleOpeningHoursChange.bind(this);
  }

  getDays() {
    return axios.get('/days');
  }

  getOpeningHours() {
    return axios.get('/opening-hours');
  }

  getRestaurantsList() {
    return axios.get('/restaurants');
  }

  searchRestaurantsList() {
    if (this.state.selectedOpeningHour == -1 & this.state.selectedDay == -1) {
      let newRestaurantList = JSON.parse(localStorage.getItem('restaurantsList'));
      this.setState({ restaurantsList: newRestaurantList })
    } else {
      axios.get(`/search/day/${this.state.selectedDay}/opening-hour/${this.state.selectedOpeningHour}`)
      .then(res => {
        this.setState({ restaurantsList: res.data })
      });
    }
  }

  handleDaysChange(day) {
    this.setState({ selectedDay: day}, () => {
      this.searchRestaurantsList();
    });
  }

  handleOpeningHoursChange(openingHour) {
    this.setState({ selectedOpeningHour: openingHour}, () => {
      this.searchRestaurantsList();
    });
  }

  componentDidMount() {
    axios.all([this.getDays(), this.getOpeningHours(), this.getRestaurantsList()])
         .then(axios.spread((days, openingHours, restaurantsList) => {
          this.setState({
            days: days.data,
            openingHours: openingHours.data,
            restaurantsList: restaurantsList.data
          });
          localStorage.setItem('restaurantsList', JSON.stringify(restaurantsList.data));
         }))
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/" exact render={() => <RestaurantsPage
                                                  days={this.state.days}
                                                  openingHours={this.state.openingHours} 
                                                  restaurantsList={this.state.restaurantsList}
                                                  handleDaysChange={this.handleDaysChange}
                                                  handleOpeningHoursChange={this.handleOpeningHoursChange}
                                                />
                                         }
            />
            <Route path="/collections" exact render={() => <CollectionsPage />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default hot(module)(App);

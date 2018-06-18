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
      restaurantsList: []
    };
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

  componentDidMount() {
    axios.all([this.getDays(), this.getOpeningHours(), this.getRestaurantsList()])
         .then(axios.spread((days, openingHours, restaurantsList) => {
          this.setState({
            days: days.data,
            openingHours: openingHours.data,
            restaurantsList: restaurantsList.data
          });
         }))
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/" exact render={() => <RestaurantsPage days={this.state.days} openingHours={this.state.openingHours} restaurantsList={this.state.restaurantsList} />} />
            <Route path="/collections" exact render={() => <CollectionsPage />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default hot(module)(App);

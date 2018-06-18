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
      restaurantsList: null
    };
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: '/restaurants'
    }).then(res => {
      const { data } = res;
      this.setState({
        restaurantsList: data
      });
    });
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/" exact render={() => <RestaurantsPage restaurantsList={this.state.restaurantsList}/>} />
            <Route path="/collections" exact render={() => <CollectionsPage />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default hot(module)(App);

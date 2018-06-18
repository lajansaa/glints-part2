/* eslint-disable */
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import RestaurantsPage from './Restaurants/RestaurantsPage';
import CollectionsPage from './Collections/CollectionsPage';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      
    };
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/" exact render={() => <RestaurantsPage />} />
            <Route path="/collections" exact render={() => <CollectionsPage />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default hot(module)(App);

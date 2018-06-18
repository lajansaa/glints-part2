const users = require('./controllers/user');

module.exports = (app) => {
  app.get('/restaurants', users.getRestaurants)
};

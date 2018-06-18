const users = require('./controllers/user');

module.exports = (app) => {
  app.get('/days', users.getDays),
  app.get('/opening-hours', users.getOpeningHours),
  app.get('/restaurants', users.getRestaurants)
};

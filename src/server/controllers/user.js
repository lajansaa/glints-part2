const db = require('../db');

const getRestaurants = (req, res) => {
  db.userDB.getRestaurants((err, queryResults) => {
    if (err) {
      console.error(err)
    } else {
      res.send(queryResults);
    }
  })
}

module.exports = {
  getRestaurants
}
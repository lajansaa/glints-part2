const db = require('../db');

const getDays = (req, res) => {
  db.userDB.getDays((err, queryResults) => {
    if (err) {
      console.error(err)
    } else {
      res.send(queryResults);
    }
  })
}

const getOpeningHours = (req, res) => {
  db.userDB.getOpeningHours((err, queryResults) => {
    if (err) {
      console.error(err)
    } else {
      res.send(queryResults);
    }
  })
}

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
  getDays,
  getOpeningHours,
  getRestaurants
}
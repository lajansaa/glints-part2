module.exports = (dbPool) => {
  return {
    getRestaurants: (callback) => {
      const sql = 'SELECT * FROM restaurants ORDER BY name;'
      dbPool.query(sql, (err, res) => {
        callback(err, res.rows);
      })
    }

  } 
}
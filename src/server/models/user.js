module.exports = (dbPool) => {
  return {
    getDays: (callback) => {
      const sql = 'SELECT * FROM days ORDER BY 1;'
      dbPool.query(sql, (err, res) => {
        callback(err, res.rows);
      })
    },

    getOpeningHours: (callback) => {
      const sql = `SELECT DISTINCT
                       OH.start_time_id,
                       HM.hour::INT,
                       HM.min,
                       HM.am_pm
                   FROM opening_hours OH
                   JOIN hour_min HM ON OH.start_time_id = HM.id
                   ORDER BY 4,2,3;`
      dbPool.query(sql, (err, res) => {
        callback(err, res.rows);
      })
    },

    getRestaurants: (callback) => {
      const sql = 'SELECT * FROM restaurants ORDER BY name;'
      dbPool.query(sql, (err, res) => {
        callback(err, res.rows);
      })
    }

  } 
}
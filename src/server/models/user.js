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
      const sql = 'SELECT * FROM restaurants R ORDER BY name;'
      dbPool.query(sql, (err, res) => {
        callback(err, res.rows);
      })
    },

    searchRestaurants: (payload, callback) => {
      const sql = `SELECT DISTINCT
                       R.*
                   FROM restaurants R
                   JOIN opening_hours OH ON R.id = OH.restaurant_id
                   WHERE CASE WHEN ${payload.openingHour} = -1 THEN (1=1)
                              ELSE OH.start_time_id = ${payload.openingHour} END
                     AND CASE WHEN ${payload.day} = -1 THEN (1=1)
                              ELSE OH.day_id = ${payload.day} END
                   ORDER BY name;`
      dbPool.query(sql, (err, res) => {
        callback(err, res.rows);
      })
    }
  } 
}
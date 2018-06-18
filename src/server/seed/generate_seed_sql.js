const fs = require('fs');
const path = require('path');
let finalString = '';
const hourMinObj = {};
const daysObj = {};

// generate sql to populate hour_min table
function hourMinSql(outputPath) {
  let id = 1;
  for (let i = 1; i <= 12; i++) {
    ['00', '30'].forEach((j) => {
      ['am', 'pm'].forEach((k) => {
        const sql = `INSERT INTO hour_min (id, hour, min, am_pm) VALUES (${id}, '${i}', '${j}', '${k}');\n`;
        fs.appendFileSync(outputPath, sql);
        if (j == '00') {
          hourMinObj[i + k] = id;
        } else {
          hourMinObj[i + ":" + j + k] = id;
        }
        id++;
      })
    })
  }
}

// generate sql to populate days table
function daysSql(outputPath) {
  let id = 1;
  ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].forEach((day) => {
    let sql = `INSERT INTO days (id, name) VALUES (${id}, '${day}');\n`;
    fs.appendFileSync(outputPath, sql);
    daysObj[day] = id;
    id++;
  })
}

// generate sql to populate days table
function openingHoursSql(inputPath, outputPath) {
  fs.readFile(inputPath, 'utf8', (err, data) => {
    const dataArr = data.split("\n");
    let id = 1;
    dataArr.forEach((row, index) => {
      const rowArr = row.split('","');
      // remove leading quotes
      const restaurantName = rowArr[0].substr(1);
      // remove trailing quotes
      const openingHours = rowArr[1].slice(0, -1);

      const restaurantNameSql = `INSERT INTO restaurants (id, name, display_hours) VALUES (${index+1}, $$${restaurantName}$$, $$${openingHours}$$);\n`;
      fs.appendFileSync(outputPath, restaurantNameSql);
      openingHours.split(" / ").forEach((opening) => {
        const openingArr = opening.split(/[,|\s]+/);
        const days = [];
        let start_time_id, end_time_id;
        openingArr.forEach((dayTime, openingArrIndex) => {
          // timing is last element
          if (openingArrIndex == openingArr.length - 1) {
            const time = dayTime.split('-');
            start_time_id = hourMinObj[time[0].trim()];
            end_time_id = hourMinObj[time[1].trim()];
            return;
          }
          // length 7 is day range
          if (dayTime.trim().length == 7) {
            start_day_id = daysObj[dayTime.slice(0,3)];
            end_day_id = daysObj[dayTime.slice(-3)];
            for (let i = start_day_id; i <= end_day_id; i++) {
              days.push(i);
            }
            return;
          }
          // length 3 is one day
          if (dayTime.trim().length == 3) {
            one_day_id = daysObj[dayTime];
            days.push(one_day_id);
            return;
          }
        })
        days.forEach((day) => {
          let openingHoursSql = `INSERT INTO opening_hours (id, restaurant_id, start_time_id, end_time_id, day_id) VALUES (${id}, ${index+1}, ${start_time_id}, ${end_time_id}, ${day});\n`;
          fs.appendFileSync(outputPath, openingHoursSql);
          id++;
        })
      })
    })
  })
}

const seedFilePath = path.join(__dirname, 'seed.sql');
const dataFilePath = path.join(__dirname, 'data.csv');

fs.exists(seedFilePath, (exists) => {
  if (exists) {
    fs.unlinkSync(seedFilePath);
  }
  hourMinSql(seedFilePath);
  daysSql(seedFilePath);
  openingHoursSql(dataFilePath, seedFilePath);
})

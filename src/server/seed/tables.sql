CREATE TABLE IF NOT EXISTS restaurants (
  id INT NOT NULL,
  name VARCHAR(60) NOT NULL,
  display_hours VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS hour_min (
  id INT NOT NULL,
  hour VARCHAR(2) NOT NULL,
  min VARCHAR(2) NULL,
  am_pm VARCHAR(2) NULL
);

CREATE TABLE IF NOT EXISTS days (
  id INT NOT NULL,
  name VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS opening_hours (
  id INT NOT NULL,
  restaurant_id INT NOT NULL,
  start_time_id INT NOT NULL,
  end_time_id INT NOT NULL,
  day_id INT NOT NULL
);
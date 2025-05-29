
DROP DATABASE IF EXISTS airganization;

CREATE DATABASE airganization;

USE airganization;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY ,
  name VARCHAR(100) NOT NULL,
  user_name VARCHAR(50) NOT NULL ,
  phone VARCHAR(20),
  email VARCHAR(100),
  role ENUM('manager', 'customer') NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE vacation_packages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  stat_date DATE,
  end_date DATE,
  description TEXT,
  price DECIMAL(10,2),
  manager_id INT,
  destination_id INT,
  available_slots INT,
  FOREIGN KEY (manager_id) REFERENCES users(id),
  FOREIGN KEY (destination_id) REFERENCES destinations(id)
);

CREATE TABLE trips (
  id INT AUTO_INCREMENT PRIMARY KEY,
  trip_track TEXT,
  package_id INT,
  exit_time DATETIME,
  return_time DATETIME,
  trip_date DATE,
  FOREIGN KEY (package_id) REFERENCES vacation_packages(id)
);
CREATE TABLE continents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  continent_name VARCHAR(50) NOT NULL
);

CREATE TABLE destinations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  continent_id INT,
  country_name VARCHAR(100) NOT NULL,
  FOREIGN KEY (continent_id) REFERENCES continents(id)
);


CREATE TABLE trips (
  id INT AUTO_INCREMENT PRIMARY KEY,
  trip_track TEXT,
  package_id INT,
  exit_time DATETIME,
  return_time DATETIME,
  trip_date DATE,
  FOREIGN KEY (package_id) REFERENCES vacation_packages(id)
);

CREATE TABLE pictures (
  id INT AUTO_INCREMENT PRIMARY KEY,
  package_id INT,
  alt_text TEXT,
  image_url VARCHAR(255),
  sort_order INT,
  FOREIGN KEY (package_id) REFERENCES vacation_packages(id)
);

CREATE TABLE discount_codes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) NOT NULL UNIQUE,
  discount_percent INT,
  expire_at DATE,
  max_uses INT,
  used_count INT DEFAULT 0,
  manager_id INT,
  FOREIGN KEY (manager_id) REFERENCES users(id)
);

CREATE TABLE invitations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  package_id INT,
  user_id INT,
  sum_parcipants INT,
  full_board BOOLEAN,
  discount_code_id INT,
  final_price DECIMAL(10,2),
  FOREIGN KEY (package_id) REFERENCES vacation_packages(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (discount_code_id) REFERENCES discount_codes(id)
);

CREATE TABLE payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  invitation_id INT,
  payment_manner VARCHAR(50),
  payment_date DATE,
  payment_refernce VARCHAR(100),
  FOREIGN KEY (invitation_id) REFERENCES invitations(id)
);

CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  package_id INT,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at DATE,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (package_id) REFERENCES vacation_packages(id)
);

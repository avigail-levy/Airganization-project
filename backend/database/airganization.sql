DROP DATABASE IF EXISTS airganization;

CREATE DATABASE airganization;

USE airganization;

show databases;
show tables;

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
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  description TEXT,
  adult_price DECIMAL(10,2) NOT NULL,
  child_price DECIMAL(10,2) NOT NULL,
  manager_id INT NOT NULL,
  destination_id INT NOT NULL,
  available_slots INT NOT NULL,
  FOREIGN KEY (manager_id) REFERENCES users(id),
  FOREIGN KEY (destination_id) REFERENCES destinations(id)
);


CREATE TABLE trips (
  id INT AUTO_INCREMENT PRIMARY KEY,
  trip_track TEXT NOT NULL,
  package_id INT NOT NULL,
  exit_time DATETIME NOT NULL,
  return_time DATETIME NOT NULL,
  trip_date DATE NOT NULL,
  FOREIGN KEY (package_id) REFERENCES vacation_packages(id)
);


CREATE TABLE continents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  continent_name VARCHAR(50) NOT NULL
);

CREATE TABLE destinations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  continent_id INT NOT NULL,
  country_name VARCHAR(100) NOT NULL,
  FOREIGN KEY (continent_id) REFERENCES continents(id)
);


CREATE TABLE pictures (
  id INT AUTO_INCREMENT PRIMARY KEY,
  package_id INT NOT NULL,
  alt_text TEXT,
  image_url VARCHAR(255) NOT NULL,
  sort_order INT NOT NULL,
  FOREIGN KEY (package_id) REFERENCES vacation_packages(id)
);


CREATE TABLE discount_codes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) NOT NULL UNIQUE,
  discount_percent INT NOT NULL,
  expire_at DATE NOT NULL,
  max_uses INT NOT NULL,
  used_count INT DEFAULT 0,
  manager_id INT NOT NULL,
  FOREIGN KEY (manager_id) REFERENCES users(id)
);


CREATE TABLE invitations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  package_id INT NOT NULL,
  user_id INT NOT NULL,
  sum_adult_parcipants INT NOT NULL,
  sum_child_parcipants INT NOT NULL,
  full_board BOOLEAN NOT NULL,
  discount_code_id INT, 
  final_price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (package_id) REFERENCES vacation_packages(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (discount_code_id) REFERENCES discount_codes(id)
);


CREATE TABLE payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  invitation_id INT NOT NULL,
  payment_manner VARCHAR(50) NOT NULL,
  payment_date DATE NOT NULL,
  payment_refernce VARCHAR(100),
  FOREIGN KEY (invitation_id) REFERENCES invitations(id)
);


CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  package_id INT NOT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at DATE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (package_id) REFERENCES vacation_packages(id)
);
-- 1. Continents
INSERT INTO continents (continent_name) VALUES
('Europe'),
('Asia'),
('America');

-- 2. Destinations
INSERT INTO destinations (continent_id, country_name) VALUES
(1, 'France'),
(2, 'Thailand'),
(3, 'USA');

-- 3. Users
INSERT INTO users (name, user_name, phone, email, role, password) VALUES
('Alice Cohen', 'alicec', '0501234567', 'alice@example.com', 'manager', 'hashed_pw1'),
('David Levi', 'davidl', '0507654321', 'david@example.com', 'manager', 'hashed_pw2'),
('Rina Mor', 'rinam', '0509876543', 'rina@example.com', 'customer', 'hashed_pw3');

-- 4. Vacation Packages
INSERT INTO vacation_packages (name, start_date, end_date, description, adult_price, child_price, manager_id, destination_id, available_slots) VALUES
('Paris Summer', '2025-07-01', '2025-07-10', 'Trip to Paris', 3000.00, 1500.00, 1, 1, 30),
('Bangkok Adventure', '2025-08-15', '2025-08-25', 'Explore Bangkok', 2500.00, 1200.00, 2, 2, 25),
('New York Fun', '2025-09-05', '2025-09-12', 'Fun in NYC', 3500.00, 1800.00, 1, 3, 40);

-- 5. Trips
INSERT INTO trips (trip_track, package_id, exit_time, return_time, trip_date) VALUES
('Eiffel Tower, Louvre', 1, '2025-07-02 09:00:00', '2025-07-02 17:00:00', '2025-07-02'),
('Grand Palace, Floating Market', 2, '2025-08-16 10:00:00', '2025-08-16 18:00:00', '2025-08-16'),
('Statue of Liberty, Times Square', 3, '2025-09-06 11:00:00', '2025-09-06 19:00:00', '2025-09-06');

-- 6. Pictures
INSERT INTO pictures (package_id, alt_text, image_url, sort_order) VALUES
(1, 'Eiffel Tower', 'https://example.com/eiffel.jpg', 1),
(2, 'Bangkok View', 'https://example.com/bangkok.jpg', 1),
(3, 'Times Square', 'https://example.com/nyc.jpg', 1);

-- 7. Discount Codes
INSERT INTO discount_codes (code, discount_percent, expire_at, max_uses, used_count, manager_id) VALUES
('SUMMER10', 10, '2025-07-01', 100, 5, 1),
('BANGKOK15', 15, '2025-08-10', 50, 3, 2),
('NY20', 20, '2025-09-01', 30, 0, 1);

-- 8. Invitations
INSERT INTO invitations (package_id, user_id, sum_adult_parcipants, sum_child_parcipants, full_board, discount_code_id, final_price) VALUES
(1, 3, 2, 1, TRUE, 1, 6750.00),
(2, 3, 1, 2, FALSE, 2, 4900.00),
(3, 3, 2, 0, TRUE, NULL, 7000.00);

-- 9. Payments
INSERT INTO payments (invitation_id, payment_manner, payment_date, payment_refernce) VALUES
(1, 'Credit Card', '2025-06-10', 'REF123456'),
(2, 'PayPal', '2025-07-20', 'PAY987654'),
(3, 'Bank Transfer', '2025-08-15', 'BNK112233');

-- 10. Reviews
INSERT INTO reviews (user_id, package_id, rating, comment, created_at) VALUES
(3, 1, 5, 'Amazing trip to Paris!', '2025-07-15'),
(3, 2, 4, 'Nice experience but a bit hot.', '2025-08-30'),
(3, 3, 5, 'Loved NYC!', '2025-09-20');


select *
from users;

SELECT * FROM users WHERE id=7;

SELECT * 
FROM users
WHERE user_name = 'alicec' AND  password = 'hashed_pw1';










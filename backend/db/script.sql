CREATE DATABASE IF NOT EXISTS pitiza;
USE pitiza;

CREATE TABLE user (
  id_user INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(128) NOT NULL UNIQUE,
  name VARCHAR(256),
  password VARCHAR(1024) NOT NULL,
  restaurant_name VARCHAR(128)
);

CREATE TABLE `order` (
  id_order INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(256) NOT NULL,
  items VARCHAR(1024) NOT NULL,
  total_price DOUBLE NOT NULL,
  user_user_id INT NOT NULL,
  FOREIGN KEY (user_user_id) REFERENCES user(id_user)
);

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema pitiza
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema pitiza
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `pitiza` DEFAULT CHARACTER SET utf8 ;
USE `pitiza` ;

-- -----------------------------------------------------
-- Table `pitiza`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pitiza`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(128) NOT NULL,
  `name` VARCHAR(256) NOT NULL,
  `email` VARCHAR(256) NOT NULL,
  `password` VARCHAR(1024) NOT NULL,
  `restaurant` VARCHAR(256) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pitiza`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pitiza`.`order` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `customer_name` VARCHAR(256) NOT NULL,
  `items` VARCHAR(256) NOT NULL,
  `total_price` DOUBLE NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_order_user_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_order_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `pitiza`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

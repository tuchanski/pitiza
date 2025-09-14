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
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(128) NOT NULL,
  `name` VARCHAR(256) NULL,
  `password` VARCHAR(1024) NOT NULL,
  `restaurant_name` VARCHAR(128) NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pitiza`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pitiza`.`order` (
  `id_order` INT NOT NULL AUTO_INCREMENT,
  `customer_name` VARCHAR(256) NOT NULL,
  `items` VARCHAR(1024) NOT NULL,
  `total_price` DOUBLE NOT NULL,
  `user_user_id` INT NOT NULL,
  PRIMARY KEY (`id_order`),
  INDEX `fk_order_user_idx` (`user_user_id` ASC) VISIBLE,
  CONSTRAINT `fk_order_user`
    FOREIGN KEY (`user_user_id`)
    REFERENCES `pitiza`.`user` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

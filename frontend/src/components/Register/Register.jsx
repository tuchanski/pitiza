import React from "react";
import styles from "./Register.module.css";
import pitizaLogo from "../../assets/pitiza.svg";
import showingPizza from "../../assets/showing-pizza2.png";
import { Link } from "react-router-dom";

function Register() {
  function termsAndConditions() {
    alert("Terms and Conditions: ...");
  }

  return (
    <div className={styles["container"]}>
      <img src={showingPizza} alt="" className={styles.showingPizza} />
      <div className={styles["login-container"]}>
        <h2>
          Hey! Join the <span>Pitiza's</span> crew.
        </h2>
        <form className={styles["login-form"]}>
          <div className={styles["form-group"]}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="password" id={styles.password}>
              Password:
            </label>
            <input type="password" id="password" name="password" required />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="password" id={styles.password}>
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              required
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="restaurant-name" id={styles["restaurant-name"]}>
              Restaurant Name:
            </label>
            <input
              type="text"
              id="restaurant-name"
              className={styles["input-restaurant-name"]}
              name="restaurant-name"
              required
            />
          </div>
          <div className={styles["terms-conditions"]}>
            <a href="#" onClick={termsAndConditions}>
              <p>Terms and Conditions</p>
            </a>
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <div className={styles["have-account"]}>
          <Link to={"/login"}>
            <p>I already have an account</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;

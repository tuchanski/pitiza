import React from "react";
import styles from "./Register.module.css";
import showingPizza from "../../assets/showing-pizza2.png";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  return (
    <div className={styles["container"]}>
      <img src={showingPizza} alt="" className={styles.showingPizza} />
      <div className={styles["login-container"]}>
        <h2>
          Hey! Join the <span className={styles["pitiza-span"]}>Pitiza's</span>{" "}
          crew.
        </h2>
        <form className={styles["login-form"]}>
          <div className={styles["form-group"]}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
              placeholder="Enter your username..."
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="name" id={styles.password}>
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              placeholder="Enter your name..."
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="password" id={styles.password}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              placeholder="Enter your password..."
            />
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
              onChange={(e) =>
                setValues({ ...values, confirmPassword: e.target.value })
              }
              placeholder="Confirm your password..."
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
              onChange={(e) =>
                setValues({ ...values, restaurantName: e.target.value })
              }
              placeholder="Enter your restaurant name..."
            />
          </div>
          <div className={styles["terms-conditions"]}>
            <a href="#">
              <p>Terms and Conditions</p>
            </a>
          </div>
          <button className={styles["sign-up"]} type="submit">
            Sign Up
          </button>
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

import React from "react";
import styles from "./Register.module.css";
import pitizaLogo from "../../assets/pitiza.svg";
import showingPizza from "../../assets/showing-pizza2.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register() {
  function termsAndConditions() {
    alert("Terms and Conditions: ...");
  }

  const [values, setValues] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    restaurantName: "",
  });

  const navigate = useNavigate("/login");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (values.password !== values.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    axios
      .post("http://localhost:3000/users", {
        username: values.username,
        name: values.name,
        password: values.password,
        restaurant_name: values.restaurantName,
      })
      .then((res) => {
        if (res.status === 201) {
          alert("User registered successfully!");
          navigate("/login");
        } else {
          alert("Error registering user. Please try again.");
        }
      })
      .catch((err) => {
        if (err.status === 500) {
          alert("Username already registered. Please choose another one.");
        } else {
          alert("Error registering user. Please try again.");
        }
      });
  };

  return (
    <div className={styles["container"]}>
      <img src={showingPizza} alt="" className={styles.showingPizza} />
      <div className={styles["login-container"]}>
        <h2>
          Hey! Join the <span>Pitiza's</span> crew.
        </h2>
        <form className={styles["login-form"]} onSubmit={handleSubmit}>
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

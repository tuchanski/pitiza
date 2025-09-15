import React from "react";
import styles from "./Login.module.css";
import pitizaLogo from "../../assets/pitiza.svg";
import showingPizza from "../../assets/showing-pizza.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [values, setValues] = React.useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3000/login", values)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", res.data.userId);
          localStorage.setItem("restaurantName", res.data.restaurantName);
          alert("Login successful!");
          navigate("/dashboard");
        } else {
          alert("Error logging in. Please try again.");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          alert("Invalid username or password.");
        } else {
          alert("Error logging in. Please try again.");
        }
      });
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["login-container"]}>
        <img src={pitizaLogo} alt="Pitiza" id={styles["pitiza-logo"]} />
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
          <div className={styles["forgot-password"]}>
            <a href="#">
              <p>Forgot password?</p>
            </a>
          </div>
          <button type="submit">Sign In</button>
        </form>
        <div className={styles["no-account"]}>
          <Link to="/register">
            <p>I don't have an account</p>
          </Link>
        </div>
      </div>
      <img src={showingPizza} alt="" className={styles.showingPizza} />
    </div>
  );
}

export default Login;

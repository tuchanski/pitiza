import React from "react";
import styles from "./Login.module.css";
import pitizaLogo from "../../assets/pitiza.svg";
import showingPizza from "../../assets/showing-pizza.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const [values, setValues] = React.useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);

    axios
      .post("http://localhost:3000/api/login", values)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast.success("Login successful!");
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401 || err.response.status === 404) {
          toast.error(err.response.data.error);
          return;
        }
        toast.error("An error occurred.");
      });
  };

  const navigate = useNavigate();

  return (
    <div className={styles["container"]}>
      <div className={styles["login-container"]}>
        <img src={pitizaLogo} alt="Pitiza" id={styles["pitiza-logo"]} />
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
          <div className={styles["forgot-password"]}>
            <a href="#">
              <p>Forgot password?</p>
            </a>
          </div>
          <button
            className={styles["submit-button"]}
            type="submit"
            onClick={handleSubmit}
          >
            Sign In
          </button>
        </form>
        <div className={styles["no-account"]}>
          <a href="">
            <p>I don't have an account</p>
          </a>
        </div>
      </div>
      <img src={showingPizza} alt="" className={styles.showingPizza} />
    </div>
  );
}

export default Login;

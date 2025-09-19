import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar(props) {
  const navigate = useNavigate();

  const restaurant = { name: props.restaurantName };

  return (
    <div className={styles.navbar}>
      <h2>
        {restaurant.name} <span id={styles.powered}>Pitiza™</span>
      </h2>
      <button id={styles["log-out"]}>Log Out</button>
    </div>
  );
}

export default Navbar;

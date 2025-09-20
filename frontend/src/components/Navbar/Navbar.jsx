import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { FiLogOut } from "react-icons/fi";

function Navbar(props) {
  const navigate = useNavigate();

  const restaurant = { name: props.restaurantName };

  return (
    <div className={styles.navbar}>
      <h2>
        {restaurant.name} <span id={styles.powered}>Pitiza™</span>
      </h2>
      <button id={styles["log-out"]}>
        <FiLogOut className={styles["logout-icon"]} />
      </button>
    </div>
  );
}

export default Navbar;

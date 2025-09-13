import styles from "./Navbar.module.css";
import { useState } from "react";
import React from "react";
import pitizaLogo from "../../../assets/pitiza.svg";

function Navbar() {
  const [restaurant, setRestaurant] = useState("");

  React.useEffect(() => {
    // Simulate fetching restaurant data from an API
    setRestaurant({ name: "Your Restaurant" });
  }, []);

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

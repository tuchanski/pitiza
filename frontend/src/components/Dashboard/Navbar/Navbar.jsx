import styles from "./Navbar.module.css";
import React from "react";
import pitizaLogo from "../../../assets/pitiza.svg";

function Navbar() {
  return (
    <div className={styles.navbar}>
      <h2>Pitiza</h2>
      <button id={styles["log-out"]}>Log Out</button>
    </div>
  );
}

export default Navbar;

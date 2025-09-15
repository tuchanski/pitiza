import styles from "./Navbar.module.css";
import { useState } from "react";
import React from "react";
import pitizaLogo from "../../../assets/pitiza.svg";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Navbar(props) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  const restaurant = { name: props.restaurantName };

  return (
    <div className={styles.navbar}>
      <h2>
        {restaurant.name} <span id={styles.powered}>Pitiza™</span>
      </h2>
      <button id={styles["log-out"]} onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
}

export default Navbar;

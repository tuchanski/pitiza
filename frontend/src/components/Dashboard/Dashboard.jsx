import React from "react";
import styles from "./Dashboard.module.css";
import Navbar from "./Navbar/Navbar.jsx";

function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <Navbar />
      <h1>Welcome to the Dashboard</h1>
    </div>
  );
}

export default Dashboard;

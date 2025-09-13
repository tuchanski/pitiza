import React from "react";
import { useState } from "react";
import styles from "./Dashboard.module.css";
import Navbar from "./Navbar/Navbar.jsx";

function Dashboard() {
  const [user, setUser] = useState("");

  function fetchUserData() {
    // Simulate fetching user data from an API
    setUser({ name: "John Doe" });
  }

  React.useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className={styles.dashboard}>
      <Navbar />

      <div className={styles.container}>
        <div className={styles["container-options"]}>
          <p>Welcome back, {user.name} 😊</p>
          <div className={styles["container-options-buttons"]}>
            <button className={styles["btn-create"]}>Create Order</button>
            <button className={styles["btn-search"]}>Search Order</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

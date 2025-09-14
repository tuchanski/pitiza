import React from "react";
import styles from "./Dashboard.module.css";

function DashboardHeader({ user, setShowModal }) {
  return (
    <div className={styles["container-options"]}>
      <p>Welcome back, {user.name} 😊</p>
      <div className={styles["container-options-buttons"]}>
        <button
          className={styles["btn-create"]}
          onClick={() => setShowModal(true)}
        >
          Create Order
        </button>
        <button className={styles["btn-search"]}>Search Order</button>
      </div>
    </div>
  );
}
export default DashboardHeader;

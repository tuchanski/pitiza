import React from "react";
import styles from "./Dashboard.module.css";

function DashboardHeader({ user, openCreateModal, openSearchModal }) {
  return (
    <div className={styles["container-options"]}>
      <p>Welcome back, {user.name} 😊</p>
      <div className={styles["container-options-buttons"]}>
        <button className={styles["btn-create"]} onClick={openCreateModal}>
          Create Order
        </button>
        <button className={styles["btn-search"]} onClick={openSearchModal}>
          Search Order
        </button>
      </div>
    </div>
  );
}
export default DashboardHeader;

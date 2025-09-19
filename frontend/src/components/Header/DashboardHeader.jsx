import React from "react";
import styles from "./DashboardHeader.module.css";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";

function DashboardHeader(props) {
  return (
    <div className={styles["container-options"]}>
      <p>Welcome back, {props.userName} 😊</p>
      <div className={styles["container-options-buttons"]}>
        <button className={styles["btn-create"]}>
          <IoMdAddCircleOutline className={styles["icon-create"]} /> Create
          Order
        </button>
        <button className={styles["btn-search"]}>
          <IoIosSearch className={styles["icon-search"]} />
          Search Order
        </button>
      </div>
    </div>
  );
}
export default DashboardHeader;

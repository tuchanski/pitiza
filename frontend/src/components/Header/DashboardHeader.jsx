import React from "react";
import styles from "./DashboardHeader.module.css";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";

function DashboardHeader(props) {
  return (
    <div className={styles["container-options"]}>
      <p>Welcome back, {props.realName} 😊</p>
      <div className={styles["container-options-buttons"]}>
        <button
          className={styles["btn-create"]}
          onClick={props.handleCreateModal}
        >
          <IoMdAddCircleOutline className={styles["icon-create"]} />
          <span>Create Order</span>
        </button>
        <button
          className={styles["btn-search"]}
          onClick={props.handleSearchModal}
        >
          <IoIosSearch className={styles["icon-search"]} />
          <span>Search Order</span>
        </button>
      </div>
    </div>
  );
}
export default DashboardHeader;

import React from "react";
import styles from "./Card.module.css";
import pizzaImg from "../../assets/pizza.jpg";
import { TiPencil } from "react-icons/ti";
import { MdDeleteForever } from "react-icons/md";

function Card(props) {
  return (
    <div className={styles["card-container"]}>
      <img src={pizzaImg} alt="" />
      <div className={styles["card-container-info"]}>
        <div className={styles.title}>
          <h2>ID: {props.info}</h2> {/* Card Title */}
        </div>
        <p className={styles["card-container-price"]}>
          Price: $ {props.totalValue}
        </p>
        <h3>
          Customer:{" "}
          <span className={styles["card-container-customer"]}>
            {props.customerName}
          </span>
        </h3>
        <p className={styles["card-container-description"]}>
          {" "}
          <span className={styles["card-container-info"]}>{props.items}</span>
        </p>
      </div>
      <div className={styles["action-btns"]}>
        <button className={styles["btn-edit"]}>
          <TiPencil className={styles["icon-edit"]} />
        </button>
        <button className={styles["btn-delete"]}>
          <MdDeleteForever className={styles["icon-delete"]} />
        </button>
      </div>
    </div>
  );
}

export default Card;

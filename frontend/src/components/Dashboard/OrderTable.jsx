import React from "react";
import styles from "./Dashboard.module.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";

function OrderTable({ orders, handleDelete }) {
  return (
    <table className={styles["orders-table"]}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer</th>
          <th>Items</th>
          <th>Total Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id_order}>
            <td>{order.id_order}</td>
            <td>{order.customer_name}</td>
            <td>{order.items}</td>
            <td>$ {order.total_price}</td>
            <td className={styles["actions-cell"]}>
              <button
                className={styles["btn-delete"]}
                onClick={() => handleDelete(order.id_order)}
              >
                <FaTrash size={22} />
              </button>
              <button className={styles["btn-update"]}>
                <FaEdit size={22} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OrderTable;

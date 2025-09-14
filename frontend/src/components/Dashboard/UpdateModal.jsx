import React from "react";
import styles from "./Dashboard.module.css";

function UpdateModal({ show, order, setOrder, onSubmit, onCancel }) {
  if (!show) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Update Order</h2>
        <form onSubmit={onSubmit}>
          <div className={styles["form-group"]}>
            <label htmlFor="customer_name">Customer Name:</label>
            <input
              type="text"
              id="customer_name"
              value={order.customer_name}
              onChange={(e) =>
                setOrder({ ...order, customer_name: e.target.value })
              }
              required
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="items">Items:</label>
            <input
              type="text"
              id="items"
              value={order.items}
              onChange={(e) => setOrder({ ...order, items: e.target.value })}
              required
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="total_price">Total Price:</label>
            <input
              type="number"
              id="total_price"
              value={order.total_price}
              onChange={(e) =>
                setOrder({ ...order, total_price: e.target.value })
              }
              required
            />
          </div>
          <div className={styles["form-actions"]}>
            <button type="submit" className={styles["btn-submit"]}>
              Update
            </button>
            <button
              type="button"
              className={styles["btn-cancel"]}
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateModal;

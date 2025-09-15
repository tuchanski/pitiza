import React from "react";
import styles from "./Dashboard.module.css";

function SearchModal({
  show,
  order,
  setOrder,
  onSubmit,
  onCancel,
  searchOrder,
  setSearchOrder,
}) {
  if (!show) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Search Order</h2>
        <form onSubmit={onSubmit}>
          <div className={styles["form-group"]}>
            <label htmlFor="customer_name">Choose an ID:</label>
            <input
              type="text"
              id="id_order"
              value={order.id_order}
              onChange={(e) => setOrder({ ...order, id_order: e.target.value })}
              required
            />
          </div>
          <div className={styles["choosen-order"]}>
            {searchOrder != null ? (
              <div>
                <h3>Order Details:</h3>
                <p>ID: {searchOrder.id_order}</p>
                <p>Customer Name: {searchOrder.customer_name}</p>
                <p>Items: {searchOrder.items}</p>
                <p>Total Price: ${searchOrder.total_price}</p>
              </div>
            ) : (
              <p></p>
            )}
          </div>
          <div className={styles["form-actions"]}>
            <button type="submit" className={styles["btn-submit"]}>
              Search
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

export default SearchModal;

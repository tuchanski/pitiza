import React from "react";
import styles from "./Modal.module.css";

function Modal({
  isOpen,
  setOpen,
  title,
  children,
  setSearchOrder,
  setHasSearched,
}) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {title && <h2>{title}</h2>}
        <div className={styles.modalBody}>{children}</div>
        <button
          className={styles["btn-close"]}
          onClick={() => {
            setOpen(false);
            if (typeof setSearchOrder === "function") setSearchOrder(null);
            if (typeof setHasSearched === "function") setHasSearched(false);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;

import React from "react";
import { useState } from "react";
import styles from "./Dashboard.module.css";
import Navbar from "./Navbar/Navbar.jsx";
import Footer from "./Footer/Footer.jsx";
import { FaTrash, FaEdit } from "react-icons/fa";

function Dashboard() {
  const [user, setUser] = useState("");
  const [orders, setOrders] = useState([]);

  function fetchUserData() {
    // Simulate fetching user data from an API
    setUser({ name: "John Doe" });
    setOrders(Array.from({ length: 50 }, (_, i) => `Order ${i + 1}`));
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

        <div className={styles["container-orders"]}>
          <div className={styles["orders-header"]}>
            <h2>Your Orders</h2>
          </div>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <ul>
              {orders.map((order, index) => (
                <div className="order-item">
                  <li key={index}>
                    {order}{" "}
                    <div className="btn-container">
                      <button className={styles["btn-delete"]}>
                        <FaTrash size={22} />
                      </button>
                      <button className={styles["btn-update"]}>
                        <FaEdit size={22} />
                      </button>
                    </div>
                  </li>
                </div>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;

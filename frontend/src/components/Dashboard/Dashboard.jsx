import React from "react";
import { useState } from "react";
import styles from "./Dashboard.module.css";
import Navbar from "./Navbar/Navbar.jsx";
import Footer from "./Footer/Footer.jsx";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useState(false);
  const [restaurant, setRestaurant] = useState("");

  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuth(false);
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:3000/me", { withCredentials: true })
      .then((res) => {
        setAuth(true);
        setUser(res.data);
        console.log(res.data);
        setRestaurant(res.data.restaurantName);
        axios
          .get(`http://localhost:3000/users/${res.data.id}/orders`, {
            withCredentials: true,
          })
          .then((res) => setOrders(res.data))
          .then(() => console.log(res.orders));
      })
      .catch(() => {
        setAuth(false);
        navigate("/login");
      });
  }, []);

  function handleDelete(id_order) {
    axios
      .delete(`http://localhost:3000/orders/${id_order}`, {
        withCredentials: true,
      })
      .then(() => {
        setOrders(orders.filter((order) => order.id_order !== id_order));
      })
      .then(() => {
        alert("Order deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
      });
  }

  return (
    <div className={styles.dashboard}>
      <Navbar restaurantName={restaurant} />
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
            <p>No orders found. Create your first order!</p>
          ) : (
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
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;

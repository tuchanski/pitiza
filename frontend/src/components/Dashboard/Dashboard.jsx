import React from "react";
import { useState } from "react";
import styles from "./Dashboard.module.css";
import Navbar from "./Navbar/Navbar.jsx";
import Footer from "./Footer/Footer.jsx";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OrderModal from "./OrderModal.jsx";
import OrderTable from "./OrderTable.jsx";
import DashboardHeader from "./DashboardHeader.jsx";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(""); // Current User
  const [orders, setOrders] = useState([]); // All Orders
  const [restaurant, setRestaurant] = useState(""); // Restaurant Name

  const [order, setOrder] = useState({
    customer_name: "",
    items: "",
    total_price: "",
  }); // New Order

  const [auth, setAuth] = useState(false); // Authentication Status
  const [showModal, setShowModal] = useState(false); // Modal Visibility

  // Fetch user and orders on component mount
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

  async function handleCreateOrder(e) {
    e.preventDefault();

    const userId = await axios
      .get("http://localhost:3000/me", { withCredentials: true })
      .then((res) => res.data.id);

    console.log("Trying to add order to: ", userId);

    await axios
      .post(`http://localhost:3000/users/${userId}/orders`, order, {
        withCredentials: true,
      })
      .then((res) => {
        setOrders([...orders, res.data]);
      })
      .then(() => {
        alert("Order created successfully");
      })
      .catch((error) => {
        console.error("Error creating order:", error);
      });

    setShowModal(false);
    setOrder({ customer_name: "", items: "", total_price: "" });
    navigate(0);
  }

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
      <OrderModal
        show={showModal}
        onSubmit={handleCreateOrder}
        order={order}
        setOrder={setOrder}
        onCancel={() => setShowModal(false)}
      />

      <Navbar restaurantName={restaurant} />
      <div className={styles.container}>
        <DashboardHeader user={user} setShowModal={setShowModal} />

        <div className={styles["container-orders"]}>
          <div className={styles["orders-header"]}>
            <h2>Your Orders</h2>
          </div>
          {orders.length === 0 ? (
            <p>No orders found. Create your first order!</p>
          ) : (
            <OrderTable orders={orders} handleDelete={handleDelete} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;

import React from "react";
import { useState } from "react";
import styles from "./Dashboard.module.css";
import Navbar from "./Navbar/Navbar.jsx";
import Footer from "./Footer/Footer.jsx";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CreateOrderModal from "./CreateOrderModal.jsx";
import OrderTable from "./OrderTable.jsx";
import DashboardHeader from "./DashboardHeader.jsx";
import UpdateModal from "./UpdateModal.jsx";
import SearchModal from "./SearchModal.jsx";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(""); // Current User
  const [orders, setOrders] = useState([]); // All Orders
  const [restaurant, setRestaurant] = useState(""); // Restaurant Name
  const [searchOrder, setSearchOrder] = useState({ id_order: "" }); // Search Order

  const [order, setOrder] = useState({
    customer_name: "",
    items: "",
    total_price: "",
  }); // New Order

  const [auth, setAuth] = useState(false); // Authentication Status
  const [showModal, setShowModal] = useState(false); // Modal Visibility
  const [showSearchModal, setShowSearchModal] = useState(false); // Create Modal Visibility
  const [showUpdateModal, setShowUpdateModal] = useState(false); // Update Modal Visibility
  const [editOrderId, setEditOrderId] = useState(null); // currently edited order id

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
    setSearchOrder(null);
    navigate(0);
  }

  function handleDelete(id_order) {
    axios
      .delete(`http://localhost:3000/orders/${id_order}`, {
        withCredentials: true,
      })
      .then(() => {
        setOrders(orders.filter((order) => order.id_order !== id_order));
        setSearchOrder(null);
      })
      .then(() => {
        alert("Order deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
      });
  }

  function handleEdit(orderToEdit) {
    setOrder(orderToEdit);
    setEditOrderId(orderToEdit.id_order);
    setShowUpdateModal(true);
    console.log("handleEdit => editing", orderToEdit);
  }

  async function handleOrderUpdate(e) {
    e.preventDefault();
    console.log("handleOrderUpdate called", editOrderId, order);
    try {
      const userId = await axios
        .get("http://localhost:3000/me", { withCredentials: true })
        .then((res) => res.data.id);

      const res = await axios.patch(
        `http://localhost:3000/users/${userId}/orders/${editOrderId}`,
        order,
        { withCredentials: true }
      );

      const updated = res && res.data ? res.data : order;
      setOrders((prev) =>
        prev.map((o) => (o.id_order === editOrderId ? updated : o))
      );
      alert("Order updated successfully");
    } catch (error) {
      console.error("Error updating order:", error);
    } finally {
      setShowUpdateModal(false);
      setOrder({ customer_name: "", items: "", total_price: "" });
      setEditOrderId(null);
      setSearchOrder(null);
      navigate(0);
    }
  }

  async function handleSearchOrder(e) {
    e.preventDefault();
    console.log("handleSearchOrder called", order);

    try {
      const userId = await axios
        .get("http://localhost:3000/me", { withCredentials: true })
        .then((res) => res.data.id);

      const res = await axios.get(
        `http://localhost:3000/users/${userId}/orders/${order.id_order}`,
        { withCredentials: true }
      );

      if (res && res.data) {
        console.log("Order found:", res.data);
        setSearchOrder(res.data);
      } else {
        console.log("No order found with that ID");
        setSearchOrder(null);
      }
    } catch (error) {
      console.error("Error searching for order:", error);
      setSearchOrder(null);
      alert("Order not found.");
    }
  }

  function openSearchModal() {
    setOrder({ id_order: "" });
    setSearchOrder(null);
    setShowSearchModal(true);
  }

  function closeSearchModal() {
    setShowSearchModal(false);
    setSearchOrder(null);
  }

  return (
    <div className={styles.dashboard}>
      <SearchModal
        show={showSearchModal}
        onSubmit={handleSearchOrder}
        order={order}
        setOrder={setOrder}
        onCancel={closeSearchModal}
        searchOrder={searchOrder}
        setSearchOrder={setSearchOrder}
      />

      <CreateOrderModal
        show={showModal}
        onSubmit={handleCreateOrder}
        order={order}
        setOrder={setOrder}
        onCancel={() => setShowModal(false)}
      />

      <UpdateModal
        show={showUpdateModal}
        onSubmit={handleOrderUpdate}
        order={order}
        setOrder={setOrder}
        onCancel={() => setShowUpdateModal(false)}
      />

      <Navbar restaurantName={restaurant} />
      <div className={styles.container}>
        <DashboardHeader
          user={user}
          openCreateModal={() => {
            setOrder({ customer_name: "", items: "", total_price: "" });
            setEditOrderId(null);
            setShowModal(true);
          }}
          openSearchModal={openSearchModal}
        />

        <div className={styles["container-orders"]}>
          <div className={styles["orders-header"]}>
            <h2>Your Orders</h2>
          </div>
          {orders.length === 0 ? (
            <p>No orders found. Create your first order!</p>
          ) : (
            <OrderTable
              orders={orders}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;

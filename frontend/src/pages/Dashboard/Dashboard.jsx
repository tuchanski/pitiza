import Navbar from "../../components/Navbar/Navbar";
import styles from "./Dashboard.module.css";
import Card from "../../components/Card/Card";
import DashboardHeader from "../../components/Header/DashboardHeader";
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Modal from "../../components/Modal/Modal";

function Dashboard() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState();
  const [restaurantName, setRestaurantName] = useState("");
  const [username, setUsername] = useState("");
  const [realName, setRealName] = useState("");
  const [orderList, setOrderList] = useState([]);

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openSearchModal, setOpenSearchModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);

      if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      setUserId(decoded.id_user);
    } catch (err) {
      console.error("Token is not valid.");
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (!userId) return;

    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:3000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data.user);
        setRestaurantName(response.data.user.restaurant_name);
        setUsername(response.data.user.username);
        setRealName(response.data.user.name);
      });

    axios
      .get(`http://localhost:3000/api/users/${userId}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setOrderList(response.data.orders);
      })
      .catch((err) => {
        console.error("Erro ao buscar pedidos:", err);
      });
  }, [userId]);

  async function handleDeleteOrder(orderId) {
    await axios
      .delete(`http://localhost:3000/api/orders/${orderId}`)
      .then(() => {
        toast.success("Order deleted successfully.");
        navigate(0);
      })
      .catch((err) => {
        toast.error("Error deleting order.");
        console.log(err);
      });
  }

  function handleCreateModal() {
    setOpenCreateModal(true);
  }

  function handleSearchModal() {
    setOpenSearchModal(true);
  }

  async function handleCreateOrder(event) {
    event.preventDefault();
    if (!userId) return;
    console.log("Creating order for user ID:", userId);
    const token = localStorage.getItem("token");
    const customerName = document.getElementById("customer_name").value;
    const selectElement = document.getElementById("items");
    const selectedText =
      selectElement.options[selectElement.selectedIndex].text;

    const totalPrice = document.getElementById("total_price").value;
    const newOrder = {
      customer_name: customerName,
      items: selectedText,
      total_price: totalPrice,
      id_user: userId,
    };

    await axios
      .post(`http://localhost:3000/api/users/${userId}/orders`, newOrder, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast.success("Order created successfully.");
        console.log(response);
        setOpenCreateModal(false);
        navigate(0);
      })
      .catch((err) => {
        toast.error("Error creating order.");
        console.log(err);
      });
  }

  async function handleSearchOrder(event) {
    event.preventDefault();
    if (!userId) return;
    const orderId = document.getElementById("order_id").value;

    const token = localStorage.getItem("token");

    await axios
      .get(`http://localhost:3000/api/users/${userId}/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={styles["dashboard"]}>
      <Navbar restaurantName={restaurantName} />
      <div className={styles["dashboard-container"]}>
        <div className={styles["dashboard-sub-container"]}>
          <DashboardHeader
            realName={realName}
            handleCreateModal={handleCreateModal}
            handleSearchModal={handleSearchModal}
          />

          {orderList.length === 0 ? (
            <div className={styles["no-orders-found"]}>
              <p>No orders found. Shall we create one? 🍕</p>
            </div>
          ) : (
            <div className={styles["cards-container"]}>
              {orderList.map((item) => (
                <div className={styles["card-item"]} key={item.id_order}>
                  <Card
                    items={item.items}
                    customerName={item.customer_name}
                    info={item.id_order}
                    totalValue={item.total_price}
                    deleteFunc={() => handleDeleteOrder(item.id_order)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <Modal
          isOpen={openCreateModal}
          setOpen={setOpenCreateModal}
          title="Create New Order"
        >
          <form
            className={styles["form-create-order"]}
            onSubmit={handleCreateOrder}
          >
            <div className={styles["form-group"]}>
              <label htmlFor="customer_name">Customer Name:</label>
              <input type="text" id="customer_name" required />
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="items">Item:</label>
              <select name="items" id="items">
                <option value="pepperoni">Pepperoni Pizza</option>
                <option value="strogonoff">Strogonoff Pizza</option>
                <option value="calabresa">Calabresa Pizza</option>
                <option value="4cheese">4-Cheese Pizza</option>
                <option value="chicken">Chicken Pizza</option>
                <option value="nutella">Nutella Pizza</option>
                <option value="strawberry">Strawberry of Love Pizza</option>
              </select>
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="total_price">Total Price:</label>
              <input type="number" id="total_price" required />
            </div>

            <button type="submit" className={styles["btn-submit"]}>
              Create
            </button>
          </form>
        </Modal>

        <Modal
          isOpen={openSearchModal}
          setOpen={setOpenSearchModal}
          title="Search Order"
        >
          <form onSubmit={handleSearchOrder}>
            <input type="text" placeholder="Order ID" id="order_id" />
            <button className={styles["btn-submit"]} type="submit">
              Search
            </button>
          </form>
        </Modal>

        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;

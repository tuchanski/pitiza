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

function Dashboard() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState();
  const [restaurantName, setRestaurantName] = useState("");
  const [username, setUsername] = useState("");
  const [realName, setRealName] = useState("");
  const [orderList, setOrderList] = useState([]);

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
        setOrderList((prev) => prev.filter((o) => o.id_order !== orderId));
      })
      .catch((err) => {
        toast.error("Error deleting order.");
        console.log(err);
      });
  }

  return (
    <div className={styles["dashboard"]}>
      <Navbar restaurantName={restaurantName} />
      <div className={styles["dashboard-container"]}>
        <div className={styles["dashboard-sub-container"]}>
          <DashboardHeader realName={realName} />

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
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;

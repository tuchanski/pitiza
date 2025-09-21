import Navbar from "../../components/Navbar/Navbar";
import styles from "./Dashboard.module.css";
import Card from "../../components/Card/Card";
import DashboardHeader from "../../components/Header/DashboardHeader";
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("5"); // Teste
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/users/${currentUser}/orders`)
      .then((response) => {
        setOrderList(response.data.orders);
      })
      .catch((err) => {
        console.log(err);
        console.log("Deu merda");
      });
  }, []);

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
      <Navbar restaurantName="Teste" />
      <div className={styles["dashboard-container"]}>
        <div className={styles["dashboard-sub-container"]}>
          <DashboardHeader userName={"Notch"} />

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

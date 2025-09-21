import Navbar from "../../components/Navbar/Navbar";
import styles from "./Dashboard.module.css";
import Card from "../../components/Card/Card";
import DashboardHeader from "../../components/Header/DashboardHeader";
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [currentUser, setCurrentUser] = useState("5"); // Teste
  const [orderList, setOrderList] = useState([""]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/users/${currentUser}/orders`)
      .then((response) => {
        setOrderList(response.data.orders);
        console.log(response.data.orders); // settando
      })
      .catch((err) => {
        console.log(err);
        console.log("Deu merda");
      });
  }, []);

  return (
    <div className={styles["dashboard"]}>
      <Navbar restaurantName="Teste" />
      <div className={styles["dashboard-container"]}>
        <div className={styles["dashboard-sub-container"]}>
          <DashboardHeader userName={"Notch"} />

          <div className={styles["cards-container"]}>
            {orderList.map((item) => {
              return (
                <div className="card-item">
                  <Card
                    key={item.id_order}
                    items={item.items}
                    customerName={item.customer_name}
                    info={item.id_order}
                    totalValue={item.total_price}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;

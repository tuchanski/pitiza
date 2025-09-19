import Navbar from "../../components/Navbar/Navbar";
import styles from "./Dashboard.module.css";
import Card from "../../components/Card/Card";
import DashboardHeader from "../../components/Header/DashboardHeader";
import Footer from "../../components/Footer/Footer";

function Dashboard() {
  return (
    <div className={styles["dashboard"]}>
      <Navbar restaurantName="Teste" />
      <div className={styles["dashboard-container"]}>
        <div className={styles["dashboard-sub-container"]}>
          <DashboardHeader userName={"Notch"} />

          <div className={styles["cards-container"]}>
            <div className="card-item">
              <Card
                name={"Fortnite"}
                items={"Pizza"}
                customerName={"Notch"}
                info={"Really delicious Pizza"}
                totalValue={29.99}
              />
            </div>
            <div className={styles["card-item"]}>
              <Card
                name={"Fortnite"}
                items={"Pizza"}
                customerName={"Notch"}
                info={"Really delicious Pizza"}
                totalValue={29.99}
              />
            </div>
            <div className={styles["card-item"]}>
              <Card
                name={"Fortnite"}
                items={"Pizza"}
                customerName={"Notch"}
                info={"Really delicious Pizza"}
                totalValue={29.99}
              />
            </div>
            <div className={styles["card-item"]}>
              <Card
                name={"Fortnite"}
                items={"Pizza"}
                customerName={"Notch"}
                info={"Really delicious Pizza"}
                totalValue={29.99}
              />
            </div>
            <div className={styles["card-item"]}>
              <Card
                name={"Fortnite"}
                items={"Pizza"}
                customerName={"Notch"}
                info={"Really delicious Pizza"}
                totalValue={29.99}
              />
            </div>
            <div className={styles["card-item"]}>
              <Card
                name={"Fortnite"}
                items={"Pizza"}
                customerName={"Notch"}
                info={"Really delicious Pizza"}
                totalValue={29.99}
              />
            </div>
            <div className={styles["card-item"]}>
              <Card
                name={"Fortnite"}
                items={"Pizza"}
                customerName={"Notch"}
                info={"Really delicious Pizza"}
                totalValue={29.99}
              />
            </div>
            <div className={styles["card-item"]}>
              <Card
                name={"Fortnite"}
                items={"Pizza"}
                customerName={"Notch"}
                info={"Really delicious Pizza"}
                totalValue={29.99}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;

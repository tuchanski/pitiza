import db from "../db.js";

export const getAllOrdersByUserId = async (req, res) => {
  const userId = req.params.id_user;
  const selectedUser = await getUser(userId);

  if (selectedUser === undefined) {
    return res.status(404).json({ error: "User not found." });
  }

  const getOrders = "SELECT * FROM pitiza.order WHERE id_user = ?";

  try {
    const [rows] = await db.query(getOrders, userId);
    return res.status(200).json({ orders: rows });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const getOrderById = async (req, res) => {
  const orderId = req.params.id;

  const sql = "SELECT * FROM pitiza.order WHERE id_order = ?";

  try {
    const [result] = await db.query(sql, orderId);

    if (result[0] === undefined) {
      return res.status(404).json({ error: "Order not found. " });
    }

    return res.status(200).json({ order: result[0] });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createOrderToUser = async (req, res) => {
  const userId = req.params.id_user;

  const { customer_name, items, total_price } = req.body;

  if (!customer_name || !items || !total_price || !userId) {
    return res.status(400).json({ error: "All fields should be declared." });
  }

  const values = [customer_name, items, total_price, userId];

  const sql =
    "INSERT INTO pitiza.order (customer_name, items, total_price, id_user) VALUES (?, ?, ?, ?)";

  try {
    const result = await db.query(sql, values);

    return res
      .status(201)
      .json({ message: "Order has been created successfully." });
  } catch (err) {
    console.log(err);

    if (err.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(404).json({ error: "User not found." });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
};

async function getUser(userId) {
  const sql = `SELECT * FROM user WHERE id_user = ?`;

  try {
    const [result] = await db.query(sql, userId);
    return result[0];
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

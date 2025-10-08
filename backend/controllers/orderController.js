import db from "../db.js";

export const getAllOrdersByUserId = async (req, res) => {
  const userId = req.params.id_user;
  const selectedUser = await getUser(userId);

  if (!selectedUser) {
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

export const getOrderByUserIdAndOrderIdFunc = async (req, res) => {
  const orderId = req.params.id_order;
  const userId = req.params.id_user;

  const values = [orderId, userId];

  const sql = "SELECT * FROM pitiza.order WHERE id_order = ? AND id_user = ?";

  try {
    const [result] = await db.query(sql, values);
    console.log(result[0]);
    return res.status(200).json({ order: result[0] });
  } catch (err) {
    console.log(err);
  }
};

export const getOrderById = async (req, res) => {
  const orderId = req.params.id;

  const sql = "SELECT * FROM pitiza.order WHERE id_order = ?";

  try {
    const [result] = await db.query(sql, orderId);

    if (!result[0]) {
      return res.status(404).json({ error: "Order not found." });
    }

    return res.status(200).json({ order: result[0] });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error." });
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
    await db.query(sql, values);

    return res.status(201).json({
      message: "Order has been created successfully.",
    });
  } catch (err) {
    console.log(err);

    if (err.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(404).json({ error: "User not found." });
    }

    return res.status(500).json({ error: "Internal server error." });
  }
};

export const deleteOrderById = async (req, res) => {
  const orderId = req.params.id;

  const order = await getOrder(orderId);

  if (!order) {
    return res.status(404).json({ error: "Order not found." });
  }

  const sql = "DELETE FROM pitiza.order WHERE id_order = ?";

  try {
    await db.query(sql, orderId);
    return res.status(200).json({ message: "Order deleted successfully." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const updateOrderById = async (req, res) => {
  const userId = req.params.id_user;
  const orderId = req.params.id_order;

  const { customer_name, items, total_price } = req.body;

  const orderToBeUpdated = await getOrderByUserIdAndOrderId(userId, orderId);

  if (!orderToBeUpdated) {
    return res.status(404).json({ error: "Order/user not found." });
  }

  const values = [
    customer_name || orderToBeUpdated.customer_name,
    items || orderToBeUpdated.items,
    total_price || orderToBeUpdated.total_price,
    userId,
  ];

  const sql =
    "UPDATE pitiza.order SET customer_name = ?, items = ?, total_price = ? WHERE id_user = ?";

  try {
    await db.query(sql, values);
    return res.status(200).json({ message: "Order updated successfully." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

async function getOrderByUserIdAndOrderId(userId, orderId) {
  const sql = "SELECT * FROM pitiza.order WHERE id_order = ? AND id_user = ?";
  const values = [orderId, userId];

  try {
    const [result] = await db.query(sql, values);
    return result[0];
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

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

async function getOrder(orderId) {
  const sql = `SELECT * FROM pitiza.order WHERE id_order = ?`;

  try {
    const [result] = await db.query(sql, orderId);
    return result[0];
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

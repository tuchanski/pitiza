import db from "../db.js";

export async function deleteUser(req, res) {
  const id = parseInt(req.params.id);
  const result = await db.deleteUser(id);

  if (result) {
    res.status(204).send();
  } else {
    res.status(404).send("User not found");
  }
}

export async function createUser(req, res) {
  try {
    const user = req.body;
    const result = await db.createUser(user);

    if (result) {
      res.status(201).send("User created successfully");
    } else {
      res.status(500).send("Error creating user");
    }
  } catch (error) {
    res.status(500).send("Error creating user: " + error.message);
  }
}

export async function updateUser(req, res) {
  const id = parseInt(req.params.id);
  const result = await db.updateUser(id, req.body);

  if (result) {
    res.status(200).send("User updated successfully");
  } else {
    res.status(404).send("User not found");
  }
}

export async function getUserById(req, res) {
  const id = parseInt(req.params.id);
  const result = await db.getUserById(id);

  if (result) {
    res.json(result);
  } else {
    res.status(404).send("User not found");
  }
}

export async function getAllUsers(_, res) {
  const result = await db.getAllUsers();

  if (result) {
    res.json(result);
  } else {
    res.status(500).send("Error retrieving users");
  }
}

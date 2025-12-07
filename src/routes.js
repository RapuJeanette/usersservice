const express = require('express');
const router = express.Router();

let users = [
  { id: 1, name: "Maria Perez", email: "maria@gmail.com" },
  { id: 2, name: "Carlos Mendez", email: "carlosm@gmail.com" }
];

router.get("/", (req, res)=> {
    res.json(users);
});

router.get("/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

  res.json(user);
});

router.post("/", (req, res) => {
  const { name, email } = req.body;

  const newUser = {
    id: users.length + 1,
    name,
    email
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

router.put("/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

  const { name, email } = req.body;

  user.name = name;
  user.email = email;

  res.json(user);
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(u => u.id !== id);

  res.json({ message: "Usuario eliminado" });
});

module.exports = router;
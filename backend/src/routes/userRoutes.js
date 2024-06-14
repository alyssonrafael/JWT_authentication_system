const express = require("express");
const { updateUser, deleteUser, listUsers, changeUserRole } = require("../controllers/userController");
const authenticateJWT = require("../middlewares/authenticateJWT");

const router = express.Router();

// Rota para atualizar o nome do usuário
router.put("/users/:userId", authenticateJWT, updateUser);

// Rota para deletar um usuário
router.delete("/users/:userId", authenticateJWT, deleteUser);

// Rota para listar todos os usuários (restrito ao ADMIN)
router.get("/users", authenticateJWT, listUsers);

// Rota para modificar a role de um usuário (restrito ao ADMIN)
router.patch("/users/:userId/role", authenticateJWT, changeUserRole);

module.exports = router;

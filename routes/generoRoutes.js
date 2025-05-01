const express = require("express");
const router = express.Router();
const { getTodosGeneros } = require("../controllers/generoController");

// GET /genero
router.get("/", getTodosGeneros);

module.exports = router;

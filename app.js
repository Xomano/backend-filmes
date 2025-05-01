require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Pasta estática para imagens
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Importar rotas (vamos criar depois)
const filmeRoutes = require("./routes/filmeRoutes");
const generoRoutes = require("./routes/generoRoutes");

// Usar rotas
app.use("/filme", filmeRoutes);
app.use("/genero", generoRoutes);

// Rota de teste
app.get("/", (req, res) => {
  res.send("API Biblioteca de Filmes funcionando!");
});

// Start servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

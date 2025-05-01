const { Pool } = require("pg");
require("dotenv").config();

// Cria a pool de conexão
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// 🔽 Teste de conexão (esse bloco pode ser removido depois)
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Erro ao conectar ao banco:", err);
  } else {
    console.log("Conectado com sucesso! Horário atual do DB:", res.rows[0]);
  }
});

module.exports = pool;

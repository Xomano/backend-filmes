const pool = require("../db/database");

const getTodosGeneros = async (req, res) => {
  try {
    const resultado = await pool.query("SELECT * FROM generos ORDER BY nome");
    res.status(200).json(resultado.rows);
  } catch (error) {
    console.error("Erro ao buscar gêneros:", error);
    res.status(500).json({ erro: "Erro interno ao buscar gêneros" });
  }
};

module.exports = {
  getTodosGeneros,
};

const path = require("path");
const pool = require("../db/database");

const getTodosFilmes = async (req, res) => {
  try {
    const query = `
      SELECT f.id, f.nome, f.avaliacao, f.imagem, g.nome AS genero
      FROM filmes f
      LEFT JOIN generos g ON f.genero_id = g.id
      ORDER BY f.nome;
    `;
    const resultado = await pool.query(query);
    res.status(200).json(resultado.rows);
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    res.status(500).json({ erro: "Erro interno ao buscar filmes" });
  }
};

const getFilmeId = async (req, res) => {
  try {
    const id = req.params.id;
    const query = `
      SELECT f.id, f.nome, f.avaliacao, f.sinopse, f.imagem, g.nome AS genero
      FROM filmes f
      LEFT JOIN generos g ON f.genero_id = g.id
      WHERE f.id = $1
      ORDER BY f.nome;
    `;

    const resultado = await pool.query(query, [id]);
    if (resultado.rowCount === 0) {
      return res.status(404).json({ erro: "Filme não encontrado" });
    }
    res.status(200).json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({ erro: "Erro interno ao buscar filmes" });
  }
};

const criarFilme = async (req, res) => {
  try {
    const { nome, avaliacao, sinopse, genero_id } = req.body;
    const imagem = req.file ? req.file.path.replace(/\\/g, "/") : null;

    const query = `
      INSERT INTO filmes (nome, avaliacao, sinopse, imagem, genero_id)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    const valores = [nome, avaliacao, sinopse, imagem, genero_id];

    const resultado = await pool.query(query, valores);
    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    console.error("Erro ao criar filme:", error);
    res.status(500).json({ erro: "Erro ao criar filme" });
  }
};

const atualizarFilme = async (req, res) => {
  try {
    const id = req.params.id;
    const { nome, avaliacao, sinopse, genero_id } = req.body;
    const imagem = req.file ? req.file.path.replace(/\\/g, "/") : null;

    // Consulta atual para pegar imagem antiga (caso não venha nova)
    const filmeAtual = await pool.query("SELECT * FROM filmes WHERE id = $1", [
      id,
    ]);

    if (filmeAtual.rowCount === 0) {
      return res.status(404).json({ erro: "Filme não encontrado" });
    }

    const imagemFinal = imagem || filmeAtual.rows[0].imagem;

    const query = `
      UPDATE filmes
      SET nome = $1, avaliacao = $2, sinopse = $3, imagem = $4, genero_id = $5
      WHERE id = $6
      RETURNING *;
    `;
    const valores = [nome, avaliacao, sinopse, imagemFinal, genero_id, id];

    const resultado = await pool.query(query, valores);
    res.status(200).json(resultado.rows[0]);
  } catch (error) {
    console.error("Erro ao atualizar filme:", error);
    res.status(500).json({ erro: "Erro interno ao atualizar filme" });
  }
};

const excluirFilme = async (req, res) => {
  try {
    const id = req.params.id;

    const resultado = await pool.query(
      "DELETE FROM filmes WHERE id = $1 RETURNING *",
      [id]
    );

    if (resultado.rowCount === 0) {
      return res
        .status(404)
        .json({ erro: "Filme não encontrado para exclusão" });
    }

    res.status(200).json({
      mensagem: "Filme excluído com sucesso",
      filme: resultado.rows[0],
    });
  } catch (error) {
    console.error("Erro ao excluir filme:", error);
    res.status(500).json({ erro: "Erro interno ao excluir filme" });
  }
};

module.exports = {
  getTodosFilmes,
  criarFilme,
  atualizarFilme,
  excluirFilme,
  getFilmeId,
};

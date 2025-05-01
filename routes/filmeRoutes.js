const express = require("express");
const router = express.Router();
// const { getTodosFilmes } = require("../controllers/filmeController");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // pasta onde a imagem será salva
  },
  filename: (req, file, cb) => {
    const nomeArquivo = `${Date.now()}-${file.originalname}`;
    cb(null, nomeArquivo);
  },
});

const upload = multer({ storage });

const {
  getTodosFilmes,
  criarFilme,
  atualizarFilme,
  excluirFilme,
  getFilmeId,
} = require("../controllers/filmeController");

router.get("/", getTodosFilmes);
router.get("/:id", getFilmeId);
router.post("/", upload.single("imagem"), criarFilme);
router.put("/:id", upload.single("imagem"), atualizarFilme);
router.delete("/:id", excluirFilme);

module.exports = router;

// src/routes.js
const express = require("express");
const router = express.Router();

const validate = require("./middleware/validate");
const IDValidator = require("./validators/IDValidator");

// Importação dos Controllers
const AutorController = require("./controllers/AutorController");
const LivroController = require("./controllers/LivroController");
// ... Importar os outros 8 Controllers (Categoria, Editora, Leitor, etc.)

// Importação dos Validators
const AutorValidator = require("./validators/AutorValidator");
const LivroValidator = require("./validators/LivroValidator");
// ... Importar os outros 8 Validators

// --- ROTAS DE LIVROS (EXEMPLO COMPLETO)
router.get("/livros", LivroController.index);
router.get("/livros/:id", IDValidator, LivroController.show);
router.post("/livros", validate(LivroValidator.store), LivroController.store);
router.put(
  "/livros/:id",
  IDValidator,
  validate(LivroValidator.update),
  LivroController.update
);
router.delete("/livros/:id", IDValidator, LivroController.destroy);

// --- ROTAS DE AUTORES (EXEMPLO)
router.get("/autores", AutorController.index);
router.get("/autores/:id", IDValidator, AutorController.show);
router.post("/autores", validate(AutorValidator.store), AutorController.store);
router.put(
  "/autores/:id",
  IDValidator,
  validate(AutorValidator.update),
  AutorController.update
);
router.delete("/autores/:id", IDValidator, AutorController.destroy);

// ... Definir as rotas para as outras 8 entidades (Categoria, Editora, Leitor, Empréstimo, etc.)

module.exports = router;

const express = require("express");
const router = express.Router();

const validate = require("./middleware/validate");
const IDValidator = require("./validators/IDValidator");

const AutorController = require("./controllers/AutorController");
const LivroController = require("./controllers/LivroController");

const AutorValidator = require("./validators/AutorValidator");
const LivroValidator = require("./validators/LivroValidator");

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

module.exports = router;

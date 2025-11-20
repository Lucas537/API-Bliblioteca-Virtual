// src/controllers/AutorController.js
const Autor = require("../models/AutorModel");

module.exports = {
  // GET /autores
  async index(req, res, next) {
    try {
      const autores = await Autor.find();
      return res.json(autores);
    } catch (err) {
      return next(err);
    }
  },

  // GET /autores/:id
  async show(req, res, next) {
    try {
      const autor = await Autor.findById(req.params.id);
      if (!autor)
        return res.status(404).json({ message: "Autor não encontrado." });
      return res.json(autor);
    } catch (err) {
      return next(err);
    }
  },

  // POST /autores
  async store(req, res, next) {
    try {
      const autor = await Autor.create(req.body);
      return res.status(201).json(autor);
    } catch (err) {
      return next(err);
    }
  },

  // PUT /autores/:id
  async update(req, res, next) {
    try {
      const autor = await Autor.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!autor)
        return res.status(404).json({ message: "Autor não encontrado." });
      return res.json(autor);
    } catch (err) {
      return next(err);
    }
  },

  // DELETE /autores/:id
  async destroy(req, res, next) {
    try {
      // Regra de Negócio: Verificar se há livros associados antes de deletar (opcional, mas boa prática)
      const Livro = require("../models/LivroModel");
      const livrosAssociados = await Livro.countDocuments({
        idAutor: req.params.id,
      });
      if (livrosAssociados > 0)
        return res
          .status(400)
          .json({ message: "Autor possui livros e não pode ser deletado." });

      const autor = await Autor.findByIdAndDelete(req.params.id);
      if (!autor)
        return res.status(404).json({ message: "Autor não encontrado." });
      return res.status(204).send();
    } catch (err) {
      return next(err);
    }
  },
};

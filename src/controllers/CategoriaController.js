const Categoria = require("../models/CategoriaModel");
const Livro = require("../models/LivroModel"); 

module.exports = {
  async index(req, res, next) {
    try {
      const categorias = await Categoria.find();
      return res.json(categorias);
    } catch (err) {
      return next(err);
    }
  },

  async show(req, res, next) {
    try {
      const categoria = await Categoria.findById(req.params.id);
      if (!categoria)
        return res.status(404).json({ message: "Categoria não encontrada." });
      return res.json(categoria);
    } catch (err) {
      return next(err);
    }
  },

  async store(req, res, next) {
    try {
      const categoria = await Categoria.create(req.body);
      return res.status(201).json(categoria);
    } catch (err) {
      return next(err);
    }
  },

  async update(req, res, next) {
    try {
      const categoria = await Categoria.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!categoria)
        return res.status(404).json({ message: "Categoria não encontrada." });
      return res.json(categoria);
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {

      const Livro = require("../models/LivroModel");
      const livrosAssociados = await Livro.countDocuments({
        idCategoria: req.params.id,
      });
      if (livrosAssociados > 0) {
        return res.status(400).json({
          message:
            "Categoria não pode ser deletada pois possui livros cadastrados.",
        });
      }

      const categoria = await Categoria.findByIdAndDelete(req.params.id);
      if (!categoria)
        return res.status(404).json({ message: "Categoria não encontrada." });
      return res.status(204).send();
    } catch (err) {
      return next(err);
    }
  },
};

const Editora = require("../models/EditoraModel");
const Livro = require("../models/LivroModel"); 

module.exports = {
  async index(req, res, next) {
    try {
      const editoras = await Editora.find();
      return res.json(editoras);
    } catch (err) {
      return next(err);
    }
  },

  async show(req, res, next) {
    try {
      const editora = await Editora.findById(req.params.id);
      if (!editora)
        return res.status(404).json({ message: "Editora não encontrada." });
      return res.json(editora);
    } catch (err) {
      return next(err);
    }
  },

  async store(req, res, next) {
    try {
      const editora = await Editora.create(req.body);
      return res.status(201).json(editora);
    } catch (err) {
      return next(err);
    }
  },

  async update(req, res, next) {
    try {
      const editora = await Editora.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!editora)
        return res.status(404).json({ message: "Editora não encontrada." });
      return res.json(editora);
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {

      const livrosAssociados = await Livro.countDocuments({
        idEditora: req.params.id,
      });
      if (livrosAssociados > 0) {
        return res.status(400).json({
          message:
            "Editora não pode ser deletada pois possui livros cadastrados.",
        });
      }

      const editora = await Editora.findByIdAndDelete(req.params.id);
      if (!editora)
        return res.status(404).json({ message: "Editora não encontrada." });
      return res.status(204).send();
    } catch (err) {
      return next(err);
    }
  },
};

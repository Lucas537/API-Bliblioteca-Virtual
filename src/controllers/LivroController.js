const Livro = require("../models/LivroModel");

const populateFields = [
  { path: "idAutor", select: "nomeCompleto nacionalidade" },
  { path: "idEditora", select: "nome cnpj" },
  { path: "idCategoria", select: "nome" },
];

module.exports = {
  async index(req, res, next) {
    try {
      const livros = await Livro.find().populate(populateFields);
      return res.json(livros);
    } catch (err) {
      return next(err);
    }
  },

  async show(req, res, next) {
    try {
      const { id } = req.params;
      const livro = await Livro.findById(id).populate(populateFields);

      if (!livro)
        return res.status(404).json({ message: "Livro não encontrado." });

      return res.json(livro);
    } catch (err) {
      return next(err);
    }
  },

  async store(req, res, next) {
    try {
      const livro = await Livro.create(req.body);
      return res.status(201).json(livro);
    } catch (err) {
      return next(err);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      if (req.body.estoque && req.body.estoque < 0) {
        return res
          .status(400)
          .json({ message: "Estoque não pode ser negativo." });
      }

      const livro = await Livro.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!livro)
        return res.status(404).json({ message: "Livro não encontrado." });

      return res.json(livro);
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const livro = await Livro.findByIdAndDelete(id);

      if (!livro)
        return res.status(404).json({ message: "Livro não encontrado." });

      return res.status(204).send();
    } catch (err) {
      return next(err);
    }
  },
};

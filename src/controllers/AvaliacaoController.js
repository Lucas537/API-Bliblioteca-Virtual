const Avaliacao = require("../models/AvaliacaoModel");

const populateFields = [
  { path: "idLivro", select: "titulo isbn" },
  { path: "idLeitor", select: "nome" },
];

module.exports = {
  async index(req, res, next) {
    try {
      const avaliacoes = await Avaliacao.find().populate(populateFields);
      return res.json(avaliacoes);
    } catch (err) {
      return next(err);
    }
  },

  async show(req, res, next) {
    try {
      const avaliacao = await Avaliacao.findById(req.params.id).populate(
        populateFields
      );
      if (!avaliacao)
        return res.status(404).json({ message: "Avaliação não encontrada." });
      return res.json(avaliacao);
    } catch (err) {
      return next(err);
    }
  },

  async store(req, res, next) {
    try {
      const avaliacao = await Avaliacao.create(req.body);
      return res.status(201).json(avaliacao);
    } catch (err) {
      return next(err);
    }
  },

  async update(req, res, next) {
    try {
      const avaliacao = await Avaliacao.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!avaliacao)
        return res.status(404).json({ message: "Avaliação não encontrada." });
      return res.json(avaliacao);
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      const avaliacao = await Avaliacao.findByIdAndDelete(req.params.id);
      if (!avaliacao)
        return res.status(404).json({ message: "Avaliação não encontrada." });
      return res.status(204).send();
    } catch (err) {
      return next(err);
    }
  },
};

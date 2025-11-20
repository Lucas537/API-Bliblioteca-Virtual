// src/controllers/LocalizacaoController.js
const Localizacao = require("../models/LocalizacaoModel");

const populateFields = [{ path: "idLivro", select: "titulo isbn" }];

module.exports = {
  // GET /localizacoes
  async index(req, res, next) {
    try {
      const localizacoes = await Localizacao.find().populate(populateFields);
      return res.json(localizacoes);
    } catch (err) {
      return next(err);
    }
  },

  // GET /localizacoes/:id
  async show(req, res, next) {
    try {
      const localizacao = await Localizacao.findById(req.params.id).populate(
        populateFields
      );
      if (!localizacao)
        return res.status(404).json({ message: "Localização não encontrada." });
      return res.json(localizacao);
    } catch (err) {
      return next(err);
    }
  },

  // POST /localizacoes
  async store(req, res, next) {
    try {
      // Se o idLivro já existir, o Mongoose/MongoDB disparará um erro de duplicidade (unique: true)
      const localizacao = await Localizacao.create(req.body);
      return res.status(201).json(localizacao);
    } catch (err) {
      return next(err);
    }
  },

  // PUT /localizacoes/:id (Usado para realocar um livro)
  async update(req, res, next) {
    try {
      const localizacao = await Localizacao.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!localizacao)
        return res.status(404).json({ message: "Localização não encontrada." });
      return res.json(localizacao);
    } catch (err) {
      return next(err);
    }
  },

  // DELETE /localizacoes/:id
  async destroy(req, res, next) {
    try {
      const localizacao = await Localizacao.findByIdAndDelete(req.params.id);
      if (!localizacao)
        return res.status(404).json({ message: "Localização não encontrada." });
      return res.status(204).send();
    } catch (err) {
      return next(err);
    }
  },
};

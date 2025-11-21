const Leitor = require("../models/LeitorModel");

module.exports = {
  async index(req, res, next) {
    try {
      const leitores = await Leitor.find();
      return res.json(leitores);
    } catch (err) {
      return next(err);
    }
  },

  async show(req, res, next) {
    try {
      const leitor = await Leitor.findById(req.params.id);
      if (!leitor)
        return res.status(404).json({ message: "Leitor não encontrado." });
      return res.json(leitor);
    } catch (err) {
      return next(err);
    }
  },

  async store(req, res, next) {
    try {
      const leitor = await Leitor.create(req.body);
      return res.status(201).json(leitor);
    } catch (err) {
      return next(err);
    }
  },

  async update(req, res, next) {
    try {
      const leitor = await Leitor.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true, 
      });
      if (!leitor)
        return res.status(404).json({ message: "Leitor não encontrado." });
      return res.json(leitor);
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {

      const leitor = await Leitor.findByIdAndDelete(req.params.id);
      if (!leitor)
        return res.status(404).json({ message: "Leitor não encontrado." });
      return res.status(204).send();
    } catch (err) {
      return next(err);
    }
  },
};

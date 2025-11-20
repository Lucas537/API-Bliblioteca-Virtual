// src/controllers/LeitorController.js
const Leitor = require("../models/LeitorModel");

module.exports = {
  // GET /leitores
  async index(req, res, next) {
    try {
      const leitores = await Leitor.find();
      return res.json(leitores);
    } catch (err) {
      return next(err);
    }
  },

  // GET /leitores/:id
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

  // POST /leitores
  async store(req, res, next) {
    try {
      // O req.body já está validado pelo Yup
      const leitor = await Leitor.create(req.body);
      return res.status(201).json(leitor);
    } catch (err) {
      // Erros de duplicidade (e.g., CPF ou Email já cadastrado) caem aqui
      return next(err);
    }
  },

  // PUT /leitores/:id
  async update(req, res, next) {
    try {
      const leitor = await Leitor.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true, // Roda as validações do Mongoose, incluindo 'unique'
      });
      if (!leitor)
        return res.status(404).json({ message: "Leitor não encontrado." });
      return res.json(leitor);
    } catch (err) {
      return next(err);
    }
  },

  // DELETE /leitores/:id
  async destroy(req, res, next) {
    try {
      // Regra de Negócio: Verificar se o leitor possui empréstimos ou reservas ativas
      // Se houver, não permitir a deleção ou alterar o status para 'inativo'

      const leitor = await Leitor.findByIdAndDelete(req.params.id);
      if (!leitor)
        return res.status(404).json({ message: "Leitor não encontrado." });
      return res.status(204).send();
    } catch (err) {
      return next(err);
    }
  },
};

// src/controllers/ReservaController.js
const Reserva = require("../models/ReservaModel");

const populateFields = [
  { path: "idLivro", select: "titulo isbn" },
  { path: "idLeitor", select: "nome email" },
];

module.exports = {
  // GET /reservas
  async index(req, res, next) {
    try {
      const reservas = await Reserva.find().populate(populateFields);
      return res.json(reservas);
    } catch (err) {
      return next(err);
    }
  },

  // GET /reservas/:id
  async show(req, res, next) {
    try {
      const reserva = await Reserva.findById(req.params.id).populate(
        populateFields
      );
      if (!reserva)
        return res.status(404).json({ message: "Reserva não encontrada." });
      return res.json(reserva);
    } catch (err) {
      return next(err);
    }
  },

  // POST /reservas
  async store(req, res, next) {
    try {
      // Regra de Negócio: Verificar se o livro está realmente indisponível

      const reserva = await Reserva.create(req.body);
      return res.status(201).json(reserva);
    } catch (err) {
      return next(err);
    }
  },

  // PUT /reservas/:id (Usado para atualizar o status: ex: Pendente -> Disponível -> Retirada)
  async update(req, res, next) {
    try {
      const reserva = await Reserva.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!reserva)
        return res.status(404).json({ message: "Reserva não encontrada." });
      // Regra de Negócio: Se o status mudar para 'Retirada', criar um Empréstimo e decrementar estoque.
      return res.json(reserva);
    } catch (err) {
      return next(err);
    }
  },

  // DELETE /reservas/:id (Para reservas canceladas manualmente)
  async destroy(req, res, next) {
    try {
      const reserva = await Reserva.findByIdAndDelete(req.params.id);
      if (!reserva)
        return res.status(404).json({ message: "Reserva não encontrada." });
      return res.status(204).send();
    } catch (err) {
      return next(err);
    }
  },
};

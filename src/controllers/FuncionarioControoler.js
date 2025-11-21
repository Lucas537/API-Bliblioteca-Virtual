const Funcionario = require("../models/FuncionarioModel");
const Emprestimo = require("../models/EmprestimoModel"); // Necessário para a regra de negócio do destroy

module.exports = {
  async index(req, res, next) {
    try {
      const funcionarios = await Funcionario.find();
      return res.json(funcionarios);
    } catch (err) {
      return next(err);
    }
  },

  async show(req, res, next) {
    try {
      const funcionario = await Funcionario.findById(req.params.id);
      if (!funcionario)
        return res.status(404).json({ message: "Funcionário não encontrado." });
      return res.json(funcionario);
    } catch (err) {
      return next(err);
    }
  },

  // POST /funcionarios
  async store(req, res, next) {
    try {
      const funcionario = await Funcionario.create(req.body);
      return res.status(201).json(funcionario);
    } catch (err) {
      return next(err);
    }
  },

  async update(req, res, next) {
    try {
      const funcionario = await Funcionario.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!funcionario)
        return res.status(404).json({ message: "Funcionário não encontrado." });
      return res.json(funcionario);
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {

      const Emprestimo = require("../models/EmprestimoModel");
      const emprestimosRegistrados = await Emprestimo.countDocuments({
        idFuncionario: req.params.id,
      });
      if (emprestimosRegistrados > 0) {
        return res.status(400).json({
          message:
            "Funcionário não pode ser deletado pois registrou operações.",
        });
      }

      const funcionario = await Funcionario.findByIdAndDelete(req.params.id);
      if (!funcionario)
        return res.status(404).json({ message: "Funcionário não encontrado." });
      return res.status(204).send();
    } catch (err) {
      return next(err);
    }
  },
};

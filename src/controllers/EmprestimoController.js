const Emprestimo = require("../models/EmprestimoModel");
const Livro = require("../models/LivroModel"); 

const populateFields = [
  { path: "idLivro", select: "titulo isbn estoque" },
  { path: "idLeitor", select: "nome cpf" },
  { path: "idFuncionario", select: "nome cargo" },
];

module.exports = {
  async index(req, res, next) {
    try {
      const emprestimos = await Emprestimo.find().populate(populateFields);
      return res.json(emprestimos);
    } catch (err) {
      return next(err);
    }
  },

  async show(req, res, next) {
    try {
      const emprestimo = await Emprestimo.findById(req.params.id).populate(
        populateFields
      );
      if (!emprestimo)
        return res.status(404).json({ message: "Empréstimo não encontrado." });
      return res.json(emprestimo);
    } catch (err) {
      return next(err);
    }
  },

  async store(req, res, next) {
    try {

      const Livro = require("../models/LivroModel");
      const livro = await Livro.findById(req.body.idLivro);
      if (!livro || livro.estoque < 1) {
        return res
          .status(400)
          .json({ message: "Livro sem estoque disponível para empréstimo." });
      }
      await Livro.findByIdAndUpdate(req.body.idLivro, {
        $inc: { estoque: -1 },
      });

      const emprestimo = await Emprestimo.create(req.body);
      return res.status(201).json(emprestimo);
    } catch (err) {
      return next(err);
    }
  },

  async update(req, res, next) {
    try {

      const originalLoan = await Emprestimo.findById(req.params.id);
      if (
        req.body.status === "Devolvido" &&
        originalLoan.status !== "Devolvido"
      ) {
        const Livro = require("../models/LivroModel");
        await Livro.findByIdAndUpdate(originalLoan.idLivro, {
          $inc: { estoque: 1 },
        });
      }

      const emprestimo = await Emprestimo.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!emprestimo)
        return res.status(404).json({ message: "Empréstimo não encontrado." });
      return res.json(emprestimo);
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      const emprestimo = await Emprestimo.findByIdAndDelete(req.params.id);
      if (!emprestimo)
        return res.status(404).json({ message: "Empréstimo não encontrado." });
      return res.status(204).send();
    } catch (err) {
      return next(err);
    }
  },
};

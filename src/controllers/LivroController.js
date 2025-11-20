// src/controllers/LivroController.js
const Livro = require("../models/LivroModel");

// Array de campos de relacionamento para usar no .populate()
const populateFields = [
  { path: "idAutor", select: "nomeCompleto nacionalidade" },
  { path: "idEditora", select: "nome cnpj" },
  { path: "idCategoria", select: "nome" },
];

module.exports = {
  // GET /livros (Buscar todos)
  async index(req, res, next) {
    try {
      // Popula os campos de relacionamento para exibir dados completos
      const livros = await Livro.find().populate(populateFields);
      return res.json(livros);
    } catch (err) {
      return next(err);
    }
  },

  // GET /livros/:id (Buscar um específico)
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

  // POST /livros (Criar novo)
  async store(req, res, next) {
    try {
      // O req.body já está validado pelo Yup/validate.js
      const livro = await Livro.create(req.body);
      // Retorna o objeto criado com status 201 (Created)
      return res.status(201).json(livro);
    } catch (err) {
      return next(err);
    }
  },

  // PUT /livros/:id (Atualizar)
  async update(req, res, next) {
    try {
      const { id } = req.params;
      // Validação de estoque (Regra de Negócio): Impede que o estoque fique negativo
      if (req.body.estoque && req.body.estoque < 0) {
        return res
          .status(400)
          .json({ message: "Estoque não pode ser negativo." });
      }

      const livro = await Livro.findByIdAndUpdate(id, req.body, {
        new: true, // Retorna o documento atualizado
        runValidators: true, // Roda as validações do Mongoose
      });

      if (!livro)
        return res.status(404).json({ message: "Livro não encontrado." });

      return res.json(livro);
    } catch (err) {
      return next(err);
    }
  },

  // DELETE /livros/:id (Deletar)
  async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const livro = await Livro.findByIdAndDelete(id);

      if (!livro)
        return res.status(404).json({ message: "Livro não encontrado." });

      // Retorna status 204 (No Content) para deleção bem sucedida
      return res.status(204).send();
    } catch (err) {
      return next(err);
    }
  },
};

// src/validators/IDValidator.js
// Middleware para validar o parâmetro :id na URL (usado em show, update, destroy)
const mongoose = require("mongoose");

module.exports = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    // Cria um erro com status 400 (Bad Request) que será capturado pelo errorHandler
    const err = new Error("ID fornecido não é um ObjectId válido.");
    err.status = 400;
    return next(err);
  }
  return next();
};

// src/middleware/errorHandler.js
module.exports = (err, req, res, next) => {
  // Log detalhado do erro para o console do servidor
  console.error("ERRO DETECTADO:", err.name, err.message);

  // Se o cabeçalho HTTP já foi enviado, transfere para o próximo handler do Express
  if (res.headersSent) return next(err);

  let status = err.status || 500;
  let message = err.message || "Internal Server Error";
  let details = err.details || null;

  // Tratamento específico para erros de validação do Yup
  if (err.name === "ValidationError" && err.errors) {
    status = 400; // Bad Request
    message = "Validation failed (Yup)";
    details = err.errors;
  }

  // Tratamento específico para erros de validação do Mongoose (ex: required)
  if (err.name === "ValidationError" && err._message) {
    status = 400; // Bad Request
    message = "Validation failed (Mongoose)";
    details = Object.keys(err.errors).map((key) => ({
      field: key,
      message: err.errors[key].message,
    }));
  }

  // Tratamento para IDs inválidos
  if (err.name === "CastError" && err.kind === "ObjectId") {
    status = 400; // Bad Request
    message = "Invalid ID format (CastError)";
  }

  return res.status(status).json({
    message,
    ...(details && { details }),
  });
};

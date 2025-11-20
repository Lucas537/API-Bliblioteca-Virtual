// src/middleware/validate.js
// Middleware genérico para aplicar schemas Yup
module.exports = (schema) => async (req, res, next) => {
  try {
    // Valida o corpo da requisição (req.body) contra o schema Yup fornecido
    const validated = await schema.validate(req.body, {
      abortEarly: false, // Coleta todos os erros de uma vez
      stripUnknown: true, // Remove campos não definidos no schema
    });

    // Substitui o body original pelo objeto validado e limpo
    req.body = validated;

    return next();
  } catch (err) {
    // Passa o erro de volta para o errorHandler (status 400)
    return next(err);
  }
};

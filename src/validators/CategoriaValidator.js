// src/validators/CategoriaValidator.js
const yup = require("yup");

const store = yup
  .object({
    nome: yup
      .string()
      .min(3)
      .max(50)
      .required("O nome da categoria é obrigatório."),
    descricao: yup.string().max(200).nullable(), // Campo opcional
  })
  .noUnknown();

const update = store.partial();

module.exports = { store, update };

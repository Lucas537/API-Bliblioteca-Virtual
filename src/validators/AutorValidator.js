// src/validators/AutorValidator.js
const yup = require("yup");

const store = yup
  .object({
    nomeCompleto: yup
      .string()
      .min(3)
      .max(150)
      .required("O nome completo do Autor é obrigatório."),
    nacionalidade: yup.string().required("A nacionalidade é obrigatória."),
    dataNascimento: yup
      .date()
      .max(new Date(), "A data de nascimento não pode ser futura.")
      .required("A data de nascimento é obrigatória."),
  })
  .noUnknown();

const update = store.partial();

module.exports = { store, update };

// src/validators/LocalizacaoValidator.js
const yup = require("yup");
// Reutiliza a validação para ObjectId
const objectId = yup
  .string()
  .matches(/^[0-9a-fA-F]{24}$/, "ID de relacionamento inválido.");

const store = yup
  .object({
    idLivro: objectId.required("ID do Livro é obrigatório."),

    andar: yup
      .string()
      .oneOf(["Térreo", "1º Andar", "2º Andar"], "Andar inválido.")
      .required("O andar é obrigatório."),

    setor: yup.string().min(2).required("O setor é obrigatório."),
    corredor: yup.string().min(1).required("O corredor é obrigatório."),
    estante: yup.string().min(1).required("A estante é obrigatória."),
  })
  .noUnknown();

const update = store.partial();

module.exports = { store, update };

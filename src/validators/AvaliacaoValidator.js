// src/validators/AvaliacaoValidator.js
const yup = require("yup");
// Reutiliza a validação para ObjectId
const objectId = yup
  .string()
  .matches(/^[0-9a-fA-F]{24}$/, "ID de relacionamento inválido.");

const store = yup
  .object({
    idLivro: objectId.required("ID do Livro é obrigatório."),
    idLeitor: objectId.required("ID do Leitor é obrigatório."),

    nota: yup
      .number()
      .integer("A nota deve ser um número inteiro.")
      .min(1, "A nota mínima é 1.")
      .max(5, "A nota máxima é 5.")
      .required("A nota é obrigatória."),

    comentario: yup.string().max(500, "Comentário muito longo.").nullable(),
  })
  .noUnknown();

const update = store.partial();

module.exports = { store, update };

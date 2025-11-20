// src/validators/EditoraValidator.js
const yup = require("yup");

// Regex simples para CNPJ no formato XX.XXX.XXX/XXXX-XX (opcional)
const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;

const store = yup
  .object({
    nome: yup.string().min(2).required("O nome da editora é obrigatório."),
    email: yup
      .string()
      .email("Formato de email inválido.")
      .required("O email é obrigatório."),
    cnpj: yup
      .string()
      .matches(cnpjRegex, {
        message: "CNPJ inválido. Use o formato XX.XXX.XXX/XXXX-XX.",
        excludeEmptyString: true, // Ignora a validação de regex se o campo for nulo/vazio
      })
      .nullable(), // Permite que seja nulo
  })
  .noUnknown();

const update = store.partial(); // Permite atualizar parcialmente

module.exports = { store, update };

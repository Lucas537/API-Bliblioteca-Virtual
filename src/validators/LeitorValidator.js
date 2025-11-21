const yup = require("yup");

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}\-?\d{4}$/;

const store = yup
  .object({
    nome: yup
      .string()
      .min(3)
      .max(150)
      .required("O nome do leitor é obrigatório."),
    email: yup
      .string()
      .email("Formato de email inválido.")
      .required("O email é obrigatório."),
    cpf: yup
      .string()
      .matches(cpfRegex, "CPF inválido. Use o formato XXX.XXX.XXX-XX.")
      .required("O CPF é obrigatório."),
    telefone: yup
      .string()
      .matches(phoneRegex, "Formato de telefone inválido.")
      .required("O telefone é obrigatório."),
  })
  .noUnknown();

const update = store.partial();

module.exports = { store, update };

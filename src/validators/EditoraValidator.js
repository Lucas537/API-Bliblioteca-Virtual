const yup = require("yup");

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
        excludeEmptyString: true,
      })
      .nullable(),
  })
  .noUnknown();

const update = store.partial(); 

module.exports = { store, update };

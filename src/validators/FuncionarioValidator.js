const yup = require("yup");

const store = yup
  .object({
    nome: yup
      .string()
      .min(3)
      .max(150)
      .required("O nome do funcionário é obrigatório."),
    cargo: yup
      .string()
      .oneOf(
        ["Bibliotecário", "Atendente", "Gerente", "Estagiário"],
        "Cargo inválido."
      )
      .required("O cargo é obrigatório."),
    salario: yup
      .number()
      .min(0.01, "O salário deve ser um valor positivo.")
      .required("O salário é obrigatório."),
  })
  .noUnknown();

const update = store.partial();

module.exports = { store, update };

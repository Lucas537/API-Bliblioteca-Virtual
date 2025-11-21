const yup = require("yup");
const objectId = yup
  .string()
  .matches(/^[0-9a-fA-F]{24}$/, "ID de relacionamento inválido.");

const store = yup
  .object({
    idLivro: objectId.required("ID do Livro é obrigatório."),
    idLeitor: objectId.required("ID do Leitor é obrigatório."),
    idFuncionario: objectId.required("ID do Funcionário é obrigatório."),

    dataEmprestimo: yup.date().required("A Data de Empréstimo é obrigatória."),
    dataPrevistaDevolucao: yup
      .date()
      .min(
        yup.ref("dataEmprestimo"),
        "A data prevista de devolução deve ser posterior à data de empréstimo."
      )
      .required("A Data Prevista de Devolução é obrigatória."),

    dataDevolucaoReal: yup
      .date()
      .min(
        yup.ref("dataEmprestimo"),
        "A data real de devolução deve ser posterior à data de empréstimo."
      )
      .nullable(),

    status: yup
      .string()
      .oneOf(["Aberto", "Devolvido", "Atrasado", "Perdido"])
      .default("Aberto"),
  })
  .noUnknown();

const update = store.partial();

module.exports = { store, update };

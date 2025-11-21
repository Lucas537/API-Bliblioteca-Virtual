const yup = require("yup");
const objectId = yup
  .string()
  .matches(/^[0-9a-fA-F]{24}$/, "ID de relacionamento inválido.");

const store = yup
  .object({
    idLivro: objectId.required("ID do Livro é obrigatório."),
    idLeitor: objectId.required("ID do Leitor é obrigatório."),

    dataReserva: yup
      .date()
      .default(() => new Date())
      .required("A Data da Reserva é obrigatória."),

    dataLimiteRetirada: yup
      .date()
      .min(
        yup.ref("dataReserva"),
        "A data limite de retirada deve ser posterior à data da reserva."
      )
      .required("A Data Limite de Retirada é obrigatória."),

    status: yup
      .string()
      .oneOf(
        ["Pendente", "Disponível", "Retirada", "Cancelada", "Expirada"],
        "Status de reserva inválido."
      )
      .default("Pendente"),
  })
  .noUnknown();

const update = store.partial();

module.exports = { store, update };

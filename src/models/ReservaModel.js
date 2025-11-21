const { Schema, model } = require("mongoose");

const ReservaSchema = new Schema(
  {
    idLivro: {
      type: Schema.Types.ObjectId,
      ref: "Livro",
      required: true,
    },
    idLeitor: {
      type: Schema.Types.ObjectId,
      ref: "Leitor",
      required: true,
    },

    dataReserva: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dataLimiteRetirada: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Pendente", "Disponível", "Retirada", "Cancelada", "Expirada"],
      default: "Pendente",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Reserva", ReservaSchema);

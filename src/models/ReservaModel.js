// src/models/ReservaModel.js
const { Schema, model } = require("mongoose");

const ReservaSchema = new Schema(
  {
    // Relacionamentos Obrigatórios
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
      // Regra: Data limite para o leitor retirar o livro antes que a reserva expire
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
    // Adicionar índice composto para evitar reservas duplicadas
    // index: [{ idLivro: 1, idLeitor: 1, status: 1 }, { unique: true, partialFilterExpression: { status: 'Pendente' } }]
  }
);

module.exports = model("Reserva", ReservaSchema);

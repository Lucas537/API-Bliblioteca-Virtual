// src/models/AvaliacaoModel.js
const { Schema, model } = require("mongoose");

const AvaliacaoSchema = new Schema(
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

    nota: {
      type: Number,
      required: true,
      min: [1, "A nota mínima é 1."],
      max: [5, "A nota máxima é 5."],
    },
    comentario: {
      type: String,
      nullable: true,
      maxlength: [500, "O comentário deve ter no máximo 500 caracteres."],
    },
  },
  {
    timestamps: true,
    // Adicionar índice composto para garantir que um leitor avalie o mesmo livro apenas uma vez:
    // index: [{ idLivro: 1, idLeitor: 1 }, { unique: true }]
  }
);

module.exports = model("Avaliacao", AvaliacaoSchema);

const { Schema, model } = require("mongoose");

const AvaliacaoSchema = new Schema(
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
  }
);

module.exports = model("Avaliacao", AvaliacaoSchema);

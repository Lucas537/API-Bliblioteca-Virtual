// src/models/LocalizacaoModel.js
const { Schema, model } = require("mongoose");

const LocalizacaoSchema = new Schema(
  {
    // Relacionamento Obrigatório (Quem está alocado)
    idLivro: {
      type: Schema.Types.ObjectId,
      ref: "Livro",
      required: true,
      unique: true, // Garante que cada livro só tenha uma localização
    },

    andar: {
      type: String,
      required: true,
      enum: ["Térreo", "1º Andar", "2º Andar"], // Exemplo de enum
    },
    setor: {
      type: String,
      required: true,
      minlength: 2,
    },
    corredor: {
      type: String,
      required: true,
      minlength: 1,
    },
    estante: {
      type: String,
      required: true,
      minlength: 1,
    },
  },
  { timestamps: true }
);

module.exports = model("Localizacao", LocalizacaoSchema);

// src/models/LeitorModel.js
const { Schema, model } = require("mongoose");

const LeitorSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
      minlength: [3, "O nome deve ter no mínimo 3 caracteres."],
      maxlength: [150, "O nome deve ter no máximo 150 caracteres."],
    },
    cpf: {
      type: String,
      required: true,
      unique: true, // Garante que não haja CPFs duplicados
      maxlength: 14, // Permite o formato com pontuação
    },
    telefone: {
      type: String,
      required: true,
      maxlength: 15,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Leitor", LeitorSchema);

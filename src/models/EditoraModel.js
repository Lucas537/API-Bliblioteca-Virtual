// src/models/EditoraModel.js
const { Schema, model } = require("mongoose");

const EditoraSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
      unique: true, // Garante que não haja nomes de editoras duplicados
      minlength: [2, "O nome deve ter no mínimo 2 caracteres."],
    },
    cnpj: {
      type: String,
      unique: true,
      sparse: true, // Permite valores nulls/undefined se o campo for opcional
      maxlength: 18, // Permite o formato com pontuação
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

module.exports = model("Editora", EditoraSchema);

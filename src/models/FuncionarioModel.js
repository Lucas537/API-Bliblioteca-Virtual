// src/models/FuncionarioModel.js
const { Schema, model } = require("mongoose");

const FuncionarioSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
      minlength: [3, "O nome deve ter no mínimo 3 caracteres."],
      maxlength: [150, "O nome deve ter no máximo 150 caracteres."],
    },
    cargo: {
      type: String,
      required: true,
      enum: ["Bibliotecário", "Atendente", "Gerente", "Estagiário"], // Exemplo de enum
    },
    salario: {
      type: Number,
      required: true,
      min: [0, "O salário deve ser um valor positivo."],
    },
  },
  { timestamps: true }
);

module.exports = model("Funcionario", FuncionarioSchema);

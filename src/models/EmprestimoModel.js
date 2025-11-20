// src/models/EmprestimoModel.js
const { Schema, model } = require("mongoose");

const EmprestimoSchema = new Schema(
  {
    // Relacionamentos Obrigatórios (Referencing)
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
    idFuncionario: {
      type: Schema.Types.ObjectId,
      ref: "Funcionario",
      required: true,
    },

    dataEmprestimo: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dataPrevistaDevolucao: {
      type: Date,
      required: true,
    },
    dataDevolucaoReal: {
      type: Date,
      nullable: true,
      default: null,
    },
    status: {
      type: String,
      enum: ["Aberto", "Devolvido", "Atrasado", "Perdido"],
      default: "Aberto",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Emprestimo", EmprestimoSchema);

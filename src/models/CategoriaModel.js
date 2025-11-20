const { Schema, model } = require("mongoose");

const CategoriaSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
      unique: true, // Garante que não haja categorias com nomes duplicados
      minlength: [3, "O nome deve ter no mínimo 3 caracteres."],
      maxlength: [50, "O nome deve ter no máximo 50 caracteres."],
    },
    descricao: {
      type: String,
      nullable: true,
      maxlength: [200, "A descrição deve ter no máximo 200 caracteres."],
    },
  },
  { timestamps: true }
);

module.exports = model("Categoria", CategoriaSchema);

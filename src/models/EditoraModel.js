const { Schema, model } = require("mongoose");

const EditoraSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
      unique: true, 
      minlength: [2, "O nome deve ter no mínimo 2 caracteres."],
    },
    cnpj: {
      type: String,
      unique: true,
      sparse: true, 
      maxlength: 18, 
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

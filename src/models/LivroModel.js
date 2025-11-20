const { Schema, model } = require("mongoose");

const LivroSchema = new Schema(
  {
    titulo: {
      type: String,
      required: true,
      minlength: [3, "O título deve ter no mínimo 3 caracteres."],
      maxlength: [200, "O título deve ter no máximo 200 caracteres."],
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
    },
    anoPublicacao: {
      type: Number,
      required: true,
      min: [1000, "Ano de publicação inválido."],
      max: [new Date().getFullYear(), "O ano não pode ser futuro."],
    },
    paginas: {
      type: Number,
      required: true,
      min: [1, "O livro deve ter no mínimo 1 página."],
    },
    estoque: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "O estoque não pode ser negativo."],
    },
    idAutor: {
      type: Schema.Types.ObjectId,
      ref: "Autor",
      required: true,
    },
    idEditora: {
      type: Schema.Types.ObjectId,
      ref: "Editora",
      required: true,
    },
    idCategoria: {
      type: Schema.Types.ObjectId,
      ref: "Categoria",
      required: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

LivroSchema.index({ titulo: "text" });

module.exports = model("Livro", LivroSchema);

const { Schema, model } = require("mongoose");

const AutorSchema = new Schema(
  {
    nomeCompleto: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 150,
    },
    nacionalidade: { type: String, required: true },
    dataNascimento: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = model("Autor", AutorSchema);

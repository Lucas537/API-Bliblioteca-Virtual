// src/validators/LivroValidator.js
const yup = require("yup");

// Regex simples para formato de ISBN (cobre ISBN-10 ou ISBN-13 com ou sem traços)
const isbnRegex =
  /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/;

const store = yup
  .object({
    titulo: yup.string().min(3).max(200).required("O título é obrigatório."),
    isbn: yup
      .string()
      .matches(isbnRegex, "ISBN inválido.")
      .required("O ISBN é obrigatório."),
    anoPublicacao: yup
      .number()
      .min(1000)
      .max(new Date().getFullYear(), "O ano não pode ser futuro.")
      .required("O ano de publicação é obrigatório."),
    paginas: yup.number().min(1).required("O número de páginas é obrigatório."),
    estoque: yup
      .number()
      .min(0)
      .default(0)
      .required("O estoque é obrigatório."),

    // Validação de IDs de relacionamento (Deve ser uma string/ObjectId válida)
    idAutor: yup
      .string()
      .matches(/^[0-9a-fA-F]{24}$/, "ID de Autor inválido.")
      .required("O Autor é obrigatório."),
    idEditora: yup
      .string()
      .matches(/^[0-9a-fA-F]{24}$/, "ID de Editora inválido.")
      .required("A Editora é obrigatória."),
    idCategoria: yup
      .string()
      .matches(/^[0-9a-fA-F]{24}$/, "ID de Categoria inválido.")
      .required("A Categoria é obrigatória."),

    tags: yup
      .array()
      .of(yup.string().min(2))
      .max(10, "Máximo de 10 tags permitido.")
      .nullable(),
  })
  .noUnknown();

const update = store.partial(); // Permite atualizar apenas alguns campos

module.exports = { store, update };

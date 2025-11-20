// src/database.js
const mongoose = require("mongoose");

// Construir a URI do MongoDB a partir das variáveis de ambiente
const buildMongoURI = () => {
  const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;
  if (!DB_USER || !DB_PASS || !DB_HOST || !DB_NAME) {
    throw new Error(
      "Variáveis de ambiente de conexão (DB_USER, DB_PASS, DB_HOST, DB_NAME) não configuradas no .env"
    );
  }
  return `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
};

const connect = async () => {
  const uri = buildMongoURI();

  try {
    await mongoose.connect(uri, {
      // As opções useNewUrlParser e useUnifiedTopology já são o padrão no Mongoose 6+
    });
    console.log("MongoDB conectado com sucesso ao Atlas!");
  } catch (err) {
    console.error("Erro na conexão com MongoDB:", err);
    // Garante que o processo seja encerrado se o banco de dados falhar
    process.exit(1);
  }
};

module.exports = { connect, mongoose };

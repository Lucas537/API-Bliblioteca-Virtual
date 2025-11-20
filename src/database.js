const mongoose = require("mongoose");

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
    });
    console.log("MongoDB conectado com sucesso ao Atlas!");
  } catch (err) {
    console.error("Erro na conexão com MongoDB:", err);
    process.exit(1);
  }
};

module.exports = { connect, mongoose };

// src/index.js
require("dotenv").config();
const express = require("express");
const { connect } = require("./database");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(express.json());

// Todas as rotas serão prefixadas com /api
app.use("/api", routes);

// Middleware de tratamento de erros global
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Conecta ao DB e inicia o servidor
connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}/api`);
    });
  })
  .catch((err) => {
    // O erro já é logado dentro do database.js, mas este é um fallback
    console.error("❌ Falha ao iniciar o servidor", err);
  });

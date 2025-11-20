require("dotenv").config();
const express = require("express");
const { connect } = require("./database");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(express.json());

app.use("/api", routes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}/api`);
    });
  })
  .catch((err) => {
    console.error("❌ Falha ao iniciar o servidor", err);
  });

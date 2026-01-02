// Servidor API

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const apiRoutes = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado ao MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB Atlas:", err);
  });

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

app.use("/api", apiRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    error: true,
    message: "Rota não encontrada",
    status: 404,
  });
});

app.use((err, req, res, next) => {
  console.error("Erro:", err);
  res.status(err.status || 500).json({
    error: true,
    message: err.message || "Erro interno do servidor",
    status: err.status || 500,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

app.listen(PORT, () => {
  console.log(` API Server rodando em http://localhost:${PORT}`);
  console.log(` Endpoints disponíveis:`);
  console.log(`   GET /api/home      - Dados da página inicial`);
  console.log(`   GET /api/bands     - Dados da página de bandas`);
  console.log(`   GET /api/songs/:id - Dados de uma música isolada`);
  console.log(`   GET /api/search    - Busca no Spotify + tracks locais`);
});

module.exports = app;

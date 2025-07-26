require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
const SpotifyWebApi = require("spotify-web-api-node");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");

// Conexão com MongoDB Atlas
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

// Configurar Spotify API
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
});

var indexRouter = require("./routes/index");
var bandsRouter = require("./routes/bands");
var songRouter = require("./routes/song");
var searchRouter = require("./routes/search");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use((req, res, next) => {
  req.requestTime = new Date().toString();
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/bands", bandsRouter);
app.use("/songs", songRouter);
app.use("/search", searchRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error", {
    bg: "stylesheets/imagens/error.PNG",
  });
});

module.exports = app;

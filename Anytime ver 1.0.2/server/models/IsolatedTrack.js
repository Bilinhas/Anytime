/*
Modelo do MongoDB:
 - spotifyId: Array de IDs do Spotify (uma música pode ter várias versões)
 - customId: ID numérico para roteamento simplificado
 - title, artist, album: Metadados da música
 - artistId: ID do artista no Spotify
 - bg: URL da imagem de fundo
 - vt, bvt, gt, bgt, bt, dt: URLs das faixas isoladas (vocal, backing vocal,
 guitarra, backing guitar, baixo, bateria)

 */

const mongoose = require("mongoose");

const isolatedTrackSchema = new mongoose.Schema(
  {
    spotifyId: {
      type: Array,
      required: true,
      index: true,
      unique: true,
    },
    customId: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    artist: String,
    artistId: String,
    album: String,
    bg: String,
    vt: String,
    bvt: String,
    gt: String,
    bgt: String,
    bt: String,
    dt: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("IsolatedTrack", isolatedTrackSchema);

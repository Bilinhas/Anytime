require("dotenv").config();
const mongoose = require("mongoose");
const IsolatedTrack = require("../routes/models/IsolatedTrack");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const base =
  "https://raw.githubusercontent.com/Bilinhas/Anytime/main/Anytime%20ver%201.0.0/public/audios/musicas";

const base2 =
  "https://raw.githubusercontent.com/Bilinhas/Anytime/main/Anytime%20ver%201.0.0/public/stylesheets/imagens";

const tracks = [
  {
    customId: 1,
    spotifyId: [
      "2EoOZnxNgtmZaD8uUmz2nD",
      "4imJ0qiL3iLTDDM9LXIgb9",
      "4xdHI4eFNst0vTZuuKrWjr",
      "5BHfKRD3LTxFz1tX8AH0DN",
      "6brgE8G5fJ4ufoJvwESbbD",
    ],
    title: "Black Hole Sun",
    artist: "Soundgarden",
    artistId: "5xUf6j4upBrXZPg6AI4MRK",
    album: "Superunknown",
    bg: `${base2}/bhs.PNG`,
    vt: `${base}/bhs/bhs%20vocal.mp3`,
    bvt: `${base}/bhs/bhs%20b%20vocal.mp3`,
    gt: `${base}/bhs/bhs%20guitar.mp3`,
    bgt: `${base}/bhs/bhs%20b%20guitar.mp3`,
    bt: `${base}/bhs/bhs%20bass.mp3`,
    dt: `${base}/bhs/bhs%20drums.mp3`,
  },
  {
    customId: 2,
    spotifyId: [
      "5sFDReWLrZHLFZFjHsjUTS",
      "0HltuYVWFg3Xa2HcbErsgv",
      "2da0KrvLB5acEfw9bCnwQY",
    ],
    title: "Would?",
    artist: "Alice In Chains",
    artistId: "64tNsm6TnZe2zpcMVMOoHL",
    album: "Dirt",
    bg: `${base2}/would.PNG`,
    vt: `${base}/would/would%20vocal.mp3`,
    bvt: "",
    gt: `${base}/would/would%20guitar.mp3`,
    bgt: "",
    bt: `${base}/would/would%20bass.mp3`,
    dt: `${base}/would/would%20drums.mp3`,
  },
  {
    customId: 3,
    spotifyId: [
      "4CeeEOM32jQcH3eN9Q2dGj",
      "6y1etHPLRsgA467gLBOgBm",
      "0vYfKwaIDwY0IcKbMcqcY5",
    ],
    title: "Smells Like Teen Spirit",
    artist: "Nirvana",
    artistId: "6olE6TJLqED3rqDCT0FyPh",
    album: "Nevermind",
    bg: `${base2}/sm.PNG`,
    vt: `${base}/smells/smells%20vocal.mp3`,
    bvt: "",
    gt: `${base}/smells/smells%20guitar.mp3`,
    bgt: "",
    bt: `${base}/smells/smells%20bass.mp3`,
    dt: `${base}/smells/smells%20drums.mp3`,
  },
  {
    customId: 4,
    spotifyId: ["5Xak5fmy089t0FYmh3VJiY"],
    title: "Black",
    artist: "Pearl Jam",
    artistId: "1w5Kfo2jwwIPruYS2UWh56",
    album: "Ten",
    bg: `${base2}/pj.PNG`,
    vt: `${base}/black/black%20vocal.mp3`,
    bvt: "",
    gt: `${base}/black/black%20guitar.mp3`,
    bgt: "",
    bt: `${base}/black/black%20bass.mp3`,
    dt: `${base}/black/black%20drums.mp3`,
  },
];

async function seed() {
  try {
    await IsolatedTrack.deleteMany({});
    await IsolatedTrack.insertMany(tracks);
    console.log("Faixas inseridas com sucesso.");
    mongoose.connection.close();
  } catch (err) {
    console.error("Erro ao inserir faixas:", err);
  }
}

seed();

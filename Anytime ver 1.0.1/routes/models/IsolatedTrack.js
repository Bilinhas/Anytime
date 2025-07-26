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

const express = require("express");
const router = express.Router();
const axios = require("axios");
const IsolatedTrack = require("./models/IsolatedTrack");

router.get("/", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.render("musicas/search", { tracks: [] });

  try {
    const tokenData = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({ grant_type: "client_credentials" }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(
              process.env.SPOTIFY_CLIENT_ID +
              ":" +
              process.env.SPOTIFY_CLIENT_SECRET
            ).toString("base64"),
        },
      }
    );

    const accessToken = tokenData.data.access_token;

    const response = await axios.get("https://api.spotify.com/v1/search", {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: { q: query, type: "track", limit: 18 },
    });

    const tracks = response.data.tracks.items;

    const enrichedTracks = await Promise.all(
      tracks.map(async (track) => {
        const found = await IsolatedTrack.findOne({ spotifyId: track.id });

        return {
          ...track,
          hasTracks: !!found,
          localTrackId: found ? found.customId : null,
        };
      })
    );

    res.render("musicas/search", {
      tracks: enrichedTracks,
      searchQuery: query,
    });
  } catch (error) {
    console.error("Erro ao buscar faixas:", error);
    res.render("musicas/search", { tracks: [] });
  }
});

module.exports = router;

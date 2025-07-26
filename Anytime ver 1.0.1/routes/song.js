const express = require("express");
const router = express.Router();
const SpotifyWebApi = require("spotify-web-api-node");
const IsolatedTrack = require("./models/IsolatedTrack.js");

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

async function getAccessToken() {
  const data = await spotifyApi.clientCredentialsGrant();
  spotifyApi.setAccessToken(data.body.access_token);
}

router.get("/search", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.render("musicas/search", { tracks: [] });

  try {
    await getAccessToken();
    const data = await spotifyApi.searchTracks(query, { limit: 10 });
    const tracks = data.body.tracks.items;

    const enrichedTracks = await Promise.all(
      tracks.map(async (track) => {
        const isolated = await IsolatedTrack.findOne({ spotifyId: track.id });
        return {
          ...track,
          isolatedId: isolated ? isolated.customId : null,
        };
      })
    );

    res.render("musicas/search", { tracks: enrichedTracks });
  } catch (err) {
    console.error("Erro ao buscar músicas:", err);
    res.status(500).send("Erro ao buscar músicas.");
  }
});

router.get("/:id", async (req, res) => {
  try {
    await getAccessToken();

    const track = await IsolatedTrack.findOne({
      customId: parseInt(req.params.id),
    }).lean();

    if (!track) {
      return res
        .status(404)
        .render("error", { message: "Música não encontrada." });
    }

    const artistData = await spotifyApi.getArtist(track.artistId);
    const topTracksData = await spotifyApi.getArtistTopTracks(
      track.artistId,
      "BR"
    );
    const albumsData = await spotifyApi.getArtistAlbums(track.artistId, {
      limit: 5,
    });

    const artistInfo = artistData.body;
    const topTracks = topTracksData.body.tracks;
    const albums = albumsData.body.items;

    res.render("musicas/song", {
      title: track.title,
      artist: track.artist,
      album: track.album,
      bg: track.bg,
      vt: track.vt,
      bvt: track.bvt,
      gt: track.gt,
      bgt: track.bgt,
      bt: track.bt,
      dt: track.dt,
      artistInfo,
      topTracks,
      albums,
    });
  } catch (err) {
    console.error("Erro ao buscar faixa isolada ou artista:", err);
    res.status(500).send("Erro interno do servidor.");
  }
});

module.exports = router;

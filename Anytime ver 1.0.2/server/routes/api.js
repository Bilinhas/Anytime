/*
Rotas da API REST

ENDPOINTS:
 - GET /api/home        - Retorna dados da página inicial
 - GET /api/bands       - Retorna dados da página de bandas
 - GET /api/songs/:id   - Retorna dados de uma música por customId
 - GET /api/search?q=   - Busca no Spotify e verifica tracks locais

*/

const express = require("express");
const router = express.Router();
const axios = require("axios");
const SpotifyWebApi = require("spotify-web-api-node");
const IsolatedTrack = require("../models/IsolatedTrack");

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

async function getAccessToken() {
  const data = await spotifyApi.clientCredentialsGrant();
  spotifyApi.setAccessToken(data.body.access_token);
}

router.get("/home", (req, res) => {
  res.json({
    title: "Anytime",
    desc: "Anything at anyway, at anywhere, at",
    btn1: "Login",
    btn2: "View song",
    body1: "Enjoy the best isolated tracks of all time",
    body2: "Available songs (for now):",
    songs: [
      {
        id: 1,
        band: "Soundgarden",
        song: "Black Hole Sun",
        img: "https://resources.tidal.com/images/d3fe64fe/c62c/4e36/a6b5/b63cb339fbd8/640x640.jpg",
      },
      {
        id: 2,
        band: "Alice In Chains",
        song: "Would?",
        img: "https://cdn.awsli.com.br/800x800/2279/2279925/produto/159732358/c72ff7c96c.jpg",
      },
      {
        id: 3,
        band: "Nirvana",
        song: "Smells Like Teen Spirit",
        img: "https://i.scdn.co/image/ab67616d0000b273fbc71c99f9c1296c56dd51b6",
      },
      {
        id: 4,
        band: "Pearl Jam",
        song: "Black",
        img: "https://i.scdn.co/image/ab67616d0000b273d400d27cba05bb0545533864",
      },
    ],
    bg1: "/images/mixagem.PNG",
    bg2: "/images/div2.PNG",
  });
});

router.get("/bands", (req, res) => {
  res.json({
    title: "Coming Soon",
    desc: "Page in development",
    bg: "/images/aicup.PNG",
  });
});

router.get("/songs/:id", async (req, res) => {
  try {
    await getAccessToken();

    const track = await IsolatedTrack.findOne({
      customId: parseInt(req.params.id),
    }).lean();

    if (!track) {
      return res.status(404).json({
        error: true,
        message: "Música não encontrada.",
        status: 404,
      });
    }

    const artistData = await spotifyApi.getArtist(track.artistId);
    const topTracksData = await spotifyApi.getArtistTopTracks(
      track.artistId,
      "BR"
    );
    const albumsData = await spotifyApi.getArtistAlbums(track.artistId, {
      limit: 5,
    });

    res.json({
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
      artistInfo: artistData.body,
      topTracks: topTracksData.body.tracks,
      albums: albumsData.body.items,
    });
  } catch (err) {
    console.error("Erro ao buscar faixa isolada ou artista:", err);
    res.status(500).json({
      error: true,
      message: "Erro interno do servidor.",
      status: 500,
    });
  }
});

router.get("/search", async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.json({ tracks: [], searchQuery: "" });
  }

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

    res.json({
      tracks: enrichedTracks,
      searchQuery: query,
    });
  } catch (error) {
    console.error("Erro ao buscar faixas:", error);
    res.json({ tracks: [], searchQuery: query, error: error.message });
  }
});

module.exports = router;

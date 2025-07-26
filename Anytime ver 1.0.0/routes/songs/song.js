var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id', function (req, res, next) {
  const musics = [
    {
      id: 2,
      title: "Alice In Chains - Would?",
      bg: '/stylesheets/imagens/would.PNG',
      vocal: 'Vocal Track',
      guitar: 'Guitar Track',
      bass: 'Bass Track',
      drums: 'Drum Track',
      vt: '/audios/musicas/would/would vocal.MP3',
      gt: '/audios/musicas/would/would guitar.MP3',
      bt: '/audios/musicas/would/would bass.MP3',
      dt: '/audios/musicas/would/would drums.MP3',
      bvocal: null,
      bguitar: null,
    },
    {
      id: 3,
      title: "Nirvana - Smells Like Teen Spirit",
      bg: '/stylesheets/imagens/sm.PNG',
      vocal: 'Vocal Track',
      guitar: 'Guitar Track',
      bass: 'Bass Track',
      drums: 'Drum Track',
      vt: '/audios/musicas/smells/smells vocal.MP3',
      gt: '/audios/musicas/smells/smells guitar.MP3',
      bt: '/audios/musicas/smells/smells bass.MP3',
      dt: '/audios/musicas/smells/smells drums.MP3',
      bvocal: null,
      bguitar: null,
    },
    {
      id: 4,
      title: "Pearl Jam - Black",
      bg: '/stylesheets/imagens/pj.PNG',
      vocal: 'Vocal Track',
      guitar: 'Guitar Track',
      bass: 'Bass Track',
      drums: 'Drum Track',
      vt: '/audios/musicas/black/black vocal.MP3',
      gt: '/audios/musicas/black/black guitar.MP3',
      bt: '/audios/musicas/black/black bass.MP3',
      dt: '/audios/musicas/black/black drums.MP3',
      bvocal: null,
      bguitar: null,
    },
    {
      id: 1,
      title: "Soundgarden - Black Hole Sun",
      bg: '/stylesheets/imagens/bhs.PNG',
      vocal: 'Vocal Track',
      guitar: 'Guitar Track',
      bvocal: 'Backing Vocal Track',
      bguitar: 'Backing Guitar Track',
      bass: 'Bass Track',
      drums: 'Drum Track',
      vt: '/audios/musicas/bhs/bhs vocal.MP3',
      bvt: '/audios/musicas/bhs/bhs b vocal.MP3',
      gt: '/audios/musicas/bhs/bhs guitar.MP3',
      bgt: '/audios/musicas/bhs/bhs b guitar.MP3',
      bt: '/audios/musicas/bhs/bhs bass.MP3',
      dt: '/audios/musicas/bhs/bhs drums.MP3'
    }
  ]

  const musicsFilter = musics.filter((music) => {
    return music.id.toString() === req.params.id.toString()
  })

  res.render('musicas/song', musicsFilter[0])

  console.log(`Página ${musics.title} acessada em ${req.requestTime}.`)
});

module.exports = router;

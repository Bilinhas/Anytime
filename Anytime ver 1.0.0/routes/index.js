var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  res.render('index', { 
    title: 'Anytime', 
    desc: 'Feel anything at anyplace, at',
    btn1: 'Login',
    btn2: 'View song',
    body1: 'Enjoy the best isolated tracks of all time',
    body2: 'Available songs (for now):',
    band1: 'Soundgarden',
    band2: 'Alice In Chains',
    band3: 'Nirvana',
    band4: 'Pearl Jam',
    song1: 'Black Hole Sun',
    song2: 'Would?',
    song3: 'Smells Like Teen Spirit',
    song4: 'Black',
    bg1: 'stylesheets/imagens/mixagem.PNG',
    bg2: 'stylesheets/imagens/div2.PNG',
    img1: 'https://resources.tidal.com/images/d3fe64fe/c62c/4e36/a6b5/b63cb339fbd8/640x640.jpg',
    img2: 'https://cdn.awsli.com.br/800x800/2279/2279925/produto/159732358/c72ff7c96c.jpg',
    img3: 'https://i.scdn.co/image/ab67616d0000b273fbc71c99f9c1296c56dd51b6',
    img4: 'https://i.scdn.co/image/ab67616d0000b273d400d27cba05bb0545533864',
  });
  
  console.log("Página 'root' acessada em (" + req.requestTime + ").");
});

module.exports = router;

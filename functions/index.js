const functions = require('firebase-functions');

let musicList = [];
for (let i = 1; i <= 1; i++) {
  musicList.push(require(`./post/music/music-${i}`)['post']);
}

let artList = [];
for (let i = 1; i <= 1; i++) {
  artList.push(require(`./post/art/art-${i}`)['post']);
}

let getData = (type) => {
  switch (type) {
    case 'art':
      let artPost = artList.sort(() => 0.5-Math.random());
      return artPost[0].sort(() => 0.5-Math.random()).slice(0, 7);
      break;
    case 'music':
      let musicPost = musicList.sort(() => 0.5-Math.random());
      return musicPost[0].sort(() => 0.5-Math.random()).slice(0, 15);
        break;
    default:
  }
}

exports.guide = functions.region('asia-northeast1').https.onRequest((req, res) => {
  res.status(200).send([
    {
      image: 'https://i.pinimg.com/564x/b1/8a/f7/b18af7736419d55d6d555eb042bd9a77.jpg',
      title: '음악, 미술 포스트 ArtiQ',
      text: 'Music makes us happy ♪'
    },
    {
      image: 'https://i.pinimg.com/564x/4d/6a/d6/4d6ad60c5fe202b33b02f64c4d81f7a8.jpg',
      title: 'ART',
      text: 'Sensuous and wonderful paintings'
    },
    {
      image: 'https://i.pinimg.com/564x/2a/6d/aa/2a6daa2a9c14e54c2337e9e20d88c9a9.jpg',
      title: 'MUSIC',
      text: '좋은 음악 같이 즐기러 가요. 매번 엄선된 음악들을 추천합니다.\n\nMUSIC 포스트 - 하나 재생, 연속 재생, 랜덤 재생도 잊지 마세요!'
    },
  ]);
});

exports.art = functions.region('asia-northeast1').https.onRequest((req, res) => {
  res.status(200).send(getData('art'));
});

exports.music = functions.region('asia-northeast1').https.onRequest((req, res) => {
  res.status(200).send(getData('music'));
});

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
      return musicPost[0].sort(() => 0.5-Math.random()).slice(0, 20);
        break;
    default:
  }
}

exports.guide = functions.region('asia-northeast1').https.onRequest((req, res) => {
  res.status(200).send([
    {
      image: 'https://i.pinimg.com/564x/d5/b6/71/d5b6717d8d08943450e2ca664e93cd27.jpg',
      title: '음악, 미술 포스트 ArtiQ',
      text: 'Music makes us happy ♪'
    },
    {
      image: 'https://i.pinimg.com/564x/9e/20/59/9e20594b101e33b4ee80d7fd61600c77.jpg',
      title: 'ART',
      text: 'Sensuous and wonderful paintings'
    },
    {
      image: 'https://i.pinimg.com/564x/0c/2d/55/0c2d5501d080cd29f73c6aab6e5682fd.jpg',
      title: 'MUSIC',
      text: '좋은 음악 같이 즐기러 가요. 매번 엄선된 음악들을 추천합니다.\n\nMUSIC - 하나 재생, 연속 재생, 랜덤 재생도 잊지 마세요!'
    },
  ]);
});

exports.art = functions.region('asia-northeast1').https.onRequest((req, res) => {
  res.status(200).send(getData('art'));
});

exports.music = functions.region('asia-northeast1').https.onRequest((req, res) => {
  res.status(200).send(getData('music'));
});

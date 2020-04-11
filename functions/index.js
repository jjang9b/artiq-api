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
      return musicPost[0].sort(() => 0.5-Math.random()).slice(0, 14);
        break;
    default:
  }
}

exports.guide = functions.region('asia-northeast1').https.onRequest((req, res) => {
  res.status(200).send([
    {
      image: 'https://i.pinimg.com/564x/fa/67/d2/fa67d2c85c7213f6172ec602acd46b31.jpg',
      title: '음악, 미술 포스트 ArtiQ',
      text: 'Music makes us happy ♪'
    },
    {
      image: 'https://i.pinimg.com/564x/d9/d1/38/d9d138acafa9c7975f0ca0e8e92c8cdc.jpg',
      title: 'ART',
      text: '너무 멋지다, 이런 감각적인 그림을 볼때면'
    },
    {
      image: 'https://i.pinimg.com/564x/2a/6d/aa/2a6daa2a9c14e54c2337e9e20d88c9a9.jpg',
      title: 'MUSIC',
      text: '좋은 음악 같이 즐기러 가요. 접속시마다 다른 엄선된 음악들을 추천드립니다.\n\n"더 보기 > MUSIC 탭 > 다음 포스트 자동 재생" 설정도 잊지 마세요.'
    },
  ]);
});

exports.art = functions.region('asia-northeast1').https.onRequest((req, res) => {
  res.status(200).send(getData('art'));
});

exports.music = functions.region('asia-northeast1').https.onRequest((req, res) => {
  res.status(200).send(getData('music'));
});

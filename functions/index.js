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
      return musicPost[0].sort(() => 0.5-Math.random()).slice(0, 12);
        break;
    default:
  }
}

exports.guide = functions.region('asia-northeast1').https.onRequest((req, res) => {
  res.status(200).send([
    {
      image: 'https://i.pinimg.com/564x/47/e8/3d/47e83d8cca50c283b5b43ecfe3abb694.jpg',
      title: '음악, 미술 포스트 ArtiQ',
      text: 'Music makes us happy ♪'
    },
    {
      image: 'https://i.pinimg.com/564x/d9/d1/38/d9d138acafa9c7975f0ca0e8e92c8cdc.jpg',
      title: 'ART',
      text: '너무 멋지다, 이런 감각적인 그림을 볼때면'
    },
    {
      image: 'https://i.pinimg.com/564x/a0/75/57/a07557fd3eacc6f586a089a10ce4ffab.jpg',
      title: 'MUSIC',
      text: '비트가 꽂히는 음악을 들을 때는 언제나 행복하다.\n\n좋은 음악 같이 즐기러 가요.\n\n"더보기 > MUSIC탭 > 다음 포스트 자동 재생" 설정도 잊지 마세요.'
    },
  ]);
});

exports.art = functions.region('asia-northeast1').https.onRequest((req, res) => {
  res.status(200).send(getData('art'));
});

exports.music = functions.region('asia-northeast1').https.onRequest((req, res) => {
  res.status(200).send(getData('music'));
});

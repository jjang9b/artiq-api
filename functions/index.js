const functions = require('firebase-functions');

let adsList = [require(`./post/ads/ads-1`)['ads']];

let musicList = [];
for (let i = 1; i <= 2; i++) {
  musicList.push(require(`./post/music/music-${i}`)['post']);
}

let artList = [];
for (let i = 1; i <= 1; i++) {
  artList.push(require(`./post/art/art-${i}`)['post']);
}

let getData = (type) => {
  switch (type) {
    case 'admusic':
      return adsList[0].sort(() => 0.5-Math.random()).slice(0, 1)[0];
      break;
    case 'adart':
      return adsList[0].sort(() => 0.5-Math.random()).slice(0, 1)[0];
      break;
    case 'art':
      let artPost = artList.sort(() => 0.5-Math.random());
      return artPost[0].sort(() => 0.5-Math.random()).slice(0, 7);
      break;
    case 'music':
      let musicPost = musicList.sort(() => 0.5-Math.random());
      return musicPost[0].sort(() => 0.5-Math.random()).slice(0, 25);
        break;
    default:
  }
}

exports.guide = functions.region('asia-northeast1').https.onRequest((req, res) => {
  res.status(200).send([
    {
      image: 'https://i.pinimg.com/564x/43/5b/29/435b2970a6062e1e1f9cfe58a5c319d8.jpg',
      title: '감각적 음악 창고 ArtiQ',
      text: 'Music makes us happy ♪'
    },
    {
      image: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FyGUcd%2FbtqEv7UBZmj%2F0cvmEQhP4kusm7XXiBBEiK%2Fimg.png',
      title: 'MUSIC',
      text: '듣고 싶은 음악을 눌러 주세요\n또 새로운 음악을 감상하고 싶을 땐 갱신 버튼을\n눌러보세요',
      con1: '0.54',
      con2: '0.05',
      con3: '0.14',
    },
    {
      image: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FbrIz7v%2FbtqEo71lGVT%2FIGitLx4uoDOpZvkeTJ1b2K%2Fimg.png',
      title: 'MUSIC',
      text: '하나, 연속, 랜덤 자동 재생이 가능합니다\n\n그럼 좋은 음악과 그림들 같이 즐기러 가요 ♭'
    },
  ]);
});

exports.admusic = functions.region('asia-northeast1').https.onRequest((req, res) => {
  res.status(200).send(getData('admusic'));
});

exports.adart = functions.region('asia-northeast1').https.onRequest((req, res) => {
  res.status(200).send(getData('adart'));
});

exports.music = functions.region('asia-northeast1').https.onRequest((req, res) => {
  res.status(200).send(getData('music'));
});

exports.art = functions.region('asia-northeast1').https.onRequest((req, res) => {
  res.status(200).send(getData('art'));
});

const functions = require('firebase-functions');

let adsList = [require(`./post/ads/ads-1`)['ads']];

let musicList = [];
for (let i = 1; i <= 3; i++) {
  musicList.push(require(`./post/music/music-${i}`)['post']);
}

let artList = [];
for (let i = 1; i <= 1; i++) {
  artList.push(require(`./post/art/art-${i}`)['post']);
}

function getMusic () {
  let count = 25;
  let musicPostList = getMusicCount(count);

  while (musicPostList.length < 25) {
    count = 25 - musicPostList.length;

    musicPostList = musicPostList.concat(getMusicCount(count));
  }

  return musicPostList;
}

function getMusicCount (count) {
  let musicPost = musicList.sort(() => 0.5-Math.random());
  return musicPost[0].sort(() => 0.5-Math.random()).slice(0, count);
}

function getRandomMusic (ranCount, genre) {
  let musicRandomPost = musicList.sort(() => 0.5-Math.random());
  return musicRandomPost[0].filter((m) => m['genre'] != genre).sort(() => 0.5-Math.random()).slice(0, ranCount);
}

let getData = (type, genre) => {
  switch (type) {
    case 'ad-music':
      return adsList[0].sort(() => 0.5-Math.random()).slice(0, 1)[0];
      break;
    case 'ad-art':
      return adsList[0].sort(() => 0.5-Math.random()).slice(0, 1)[0];
      break;
    case 'art':
      let artPost = artList.sort(() => 0.5-Math.random());
      return artPost[0].sort(() => 0.5-Math.random()).slice(0, 7);
      break;
    case 'music':
      return getMusic();
        break;
    case 'music-like':
      if (!genre) {
        return getMusic();
      }

      let likeList = [];
      for (let i in musicList) {
        let genreFilter = musicList[i].filter((m) => m['genre'] == genre);

        if (genreFilter.length > 0) {
          likeList = likeList.concat(genreFilter);
        }
      }

      likeList = likeList.sort(() => 0.5-Math.random()).slice(0, 10);
      let ranCount = 15;

      if (likeList.length < 10) {
        ranCount += (10 - likeList.length);
      }

      let musicRandomList = getRandomMusic(ranCount, genre);
      while ((likeList.length + musicRandomList.length) < 25) {
        ranCount -= musicRandomList.length;

        musicRandomList = musicRandomList.concat(getRandomMusic(ranCount, genre));
      }

      return likeList.concat(musicRandomList);
        break;
    default:
  }
}

exports.guide = functions.region('asia-northeast1').https.onRequest((req, res) => {
  res.status(200).send([
    {
      image: 'https://i.pinimg.com/564x/b8/77/c3/b877c39d92e4b5333e7a831d5ac9dfa0.jpg',
      title: '감각적 음악 창고 ArtiQ',
      text: 'Music makes us happy ♪'
    },
    {
      image: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FyGUcd%2FbtqEv7UBZmj%2F0cvmEQhP4kusm7XXiBBEiK%2Fimg.png',
      title: 'MUSIC',
      text: '듣고 싶은 음악을 눌러 주세요\n또 새로운 음악을 감상하고 싶을 땐 갱신 버튼을\n눌러보세요',
    },
    {
      image: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FdFqTNE%2FbtqEO0HkacN%2FuhWH0gvUrS6H57GyWy6sCk%2Fimg.png',
      title: 'MUSIC',
      text: '취향 장르 음악을 상위에 먼저 추천해 드려요',
    },
    {
      image: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FbrIz7v%2FbtqEo71lGVT%2FIGitLx4uoDOpZvkeTJ1b2K%2Fimg.png',
      title: 'MUSIC',
      text: '하나, 연속, 랜덤 자동 재생이 가능합니다\n\n그럼 좋은 음악과 그림들 같이 즐기러 가요 ♭'
    },
  ]);
});

exports.admusic = functions.region('asia-northeast1').https.onRequest((req, res) => {
  res.status(200).send(getData('ad-music'));
});

exports.adart = functions.region('asia-northeast1').https.onRequest((req, res) => {
  res.status(200).send(getData('ad-art'));
});

exports.music = functions.region('asia-northeast1').https.onRequest((req, res) => {
  res.status(200).send(getData('music'));
});

exports.musiclike = functions.region('asia-northeast1').https.onRequest((req, res) => {
  res.status(200).send(getData('music-like', req.query['genre']));
});

exports.art = functions.region('asia-northeast1').https.onRequest((req, res) => {
  res.status(200).send(getData('art'));
});

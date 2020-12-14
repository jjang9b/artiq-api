const functions = require('firebase-functions');

let adsList = [require(`./post/ads/ads-1`)['ads']];

let musicPostList = [];
for (let i = 1; i <= 4; i++) {
  musicPostList.push(require(`./post/music/music-${i}`)['post']);
}

let artList = [];
for (let i = 1; i <= 1; i++) {
  artList.push(require(`./post/art/art-${i}`)['post']);
}

function getGenreList ({genre}) {
  let genreAllList = [];

  for (let i = 0; i < musicPostList.length; i++) {
      genreAllList = genreAllList.concat(musicPostList[i].filter((m) => m['genre'] == genre));
  }

  return genreAllList.sort(() => 0.5 - Math.random()).slice(0, 10);
}

function getMusicList ({totalCount, getCount, genre}) {
  let musicList = [];
  let loofIndex = 0;

  while (musicList.length < totalCount) {
    if (loofIndex > musicPostList.length -1) {
      loofIndex = 0;
    }

    let getMusic = musicPostList[loofIndex]
        .filter((m) => m['genre'] != genre)
        .sort(() => 0.5 - Math.random()).slice(0, getCount);

    if (getMusic.length > 0) {
      musicList = musicList.concat(getMusic);
    }

    loofIndex += 1;
  }

  return musicList;
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
      return artPost[0].sort(() => 0.5-Math.random()).slice(0, 10);
      break;
    case 'music-like':
      if (!genre) {
        return getMusicList({totalCount: 25, getCount: 3, genre: null});
      }

      let ranCount = 4;
      let ranListCount = 15;
      let musicList = [];

      let genreList = getGenreList({genre});
      let randomList = getMusicList({totalCount: ranListCount, getCount: ranCount, genre});
      musicList = musicList.concat(genreList);
      musicList = musicList.concat(randomList);

      return musicList;
        break;
    default:
  }
}

exports.guide = functions.region('asia-northeast1').https.onRequest((req, res) => {
  res.status(200).send([
    {
      image: 'https://i.pinimg.com/originals/d2/07/73/d20773d100002ce7593a70f313aa0a15.gif',
      title: '감각적 음악 창고 ArtiQ',
      text: 'Music makes us happy ♪'
    },
    {
      image: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FSdepx%2FbtqEPlZtJkb%2F2SSxFvWEXqke6KzKdGPkPk%2Fimg.png',
      title: 'MUSIC',
      text: '듣고 싶은 음악을 눌러 주세요\n또 새로운 음악을 감상하고 싶을 땐 갱신 버튼을\n눌러보세요',
    },
    {
      image: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fw0KQ5%2FbtqEOZikNNF%2F7TlunIqU97k5n9gwJNu6c1%2Fimg.png',
      title: 'MUSIC',
      text: '많이 들은 취향 장르 음악을 상위에 먼저 추천해 드려요',
    },
    {
      image: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FcSW7gn%2FbtqEO0nZjqB%2Fc9IIbiCvv5GElfVGmFidh1%2Fimg.png',
      title: 'MUSIC',
      text: '하나, 연속, 랜덤 자동 재생이 가능합니다\n\n그럼 좋은 음악과 그림들 같이 즐기러 가요 ♭'
    },
  ]);
});

exports.musiclike = functions.region('asia-northeast1').https.onRequest((req, res) => {
  res.status(200).send(getData('music-like', req.query['genre']));
});

exports.art = functions.region('asia-northeast1').https.onRequest((req, res) => {
  res.status(200).send(getData('art'));
});

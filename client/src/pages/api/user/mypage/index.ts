import type { NextApiRequest, NextApiResponse } from 'next';

export default function signUp(req: NextApiRequest, res: NextApiResponse) {
  res.status(201).json({
    userId: '12@Sddh4',
    loginId: 'doyu',
    nickname: '마마망',
    profileImgPath: 'https://source.boringavatars.com/beam/150/doyu5',
    followingList: [
      {
        userId: 11, // 아이디는 다 다름
        loginId: 'junp',
        nickname: '준ㅍ',
        isAlsoFollowed: false,
        imgId: 'https://source.boringavatars.com/beam/150/junp',
      },
      {
        userId: 11,
        loginId: 'arthur',
        nickname: '아thㅓ',
        isAlsoFollowed: false,
        imgId: 'https://source.boringavatars.com/beam/150/arthur5',
      },
      {
        userId: 11,
        loginId: 'waypil',
        nickname: 'ㅣㅁㅅㅁㅣ',
        isAlsoFollowed: true,
        imgId: 'https://source.boringavatars.com/beam/150/waypil',
      },
      {
        userId: 11,
        loginId: 'jaegon',
        nickname: '바지사장',
        isAlsoFollowed: true,
        imgId: 'https://source.boringavatars.com/beam/150/jaegon',
      },
      {
        userId: 11,
        loginId: 'ogu',
        nickname: '햄구맘',
        isAlsoFollowed: true,
        imgId:
          'https://i.namu.wiki/i/VxdEKDNZCp9hAW5TU5-3MZTePLGSdlYKzEZUyVLDB-Cyo950Ee19yaOL8ayxgJzEfMYfzfLcRYuwkmKEs2cg0w.webp',
      },
      {
        userId: 11,
        loginId: 'yoonhee',
        nickname: '신인류',
        isAlsoFollowed: true,
        imgId: 'https://source.boringavatars.com/beam/150/yoonhee',
      },
      {
        userId: 11,
        loginId: 'onestar',
        nickname: 'oneStar',
        isAlsoFollowed: true,
        imgId: 'https://source.boringavatars.com/beam/150/hanstar',
      },
    ],
    followerList: [
      {
        userId: 11,
        loginId: 'ogu',
        nickname: '햄구맘',
        isAlsoFollowed: true,
        imgId:
          'https://i.namu.wiki/i/VxdEKDNZCp9hAW5TU5-3MZTePLGSdlYKzEZUyVLDB-Cyo950Ee19yaOL8ayxgJzEfMYfzfLcRYuwkmKEs2cg0w.webp',
      },
      {
        userId: 11,
        loginId: 'apple',
        nickname: '망고친구',
        isAlsoFollowed: false,
        imgId: 'https://source.boringavatars.com/beam/150/apple',
      },
      {
        userId: 11,
        loginId: 'maximum123',
        nickname: '나그네입니다최대글자',
        isAlsoFollowed: false,
        imgId: 'https://source.boringavatars.com/beam/150/whoareyou',
      },
      {
        userId: 11,
        loginId: 'waypil',
        nickname: 'ㅣㅁㅅㅁㅣ',
        isAlsoFollowed: true,
        imgId: 'https://source.boringavatars.com/beam/150/waypil',
      },
      {
        userId: 11,
        loginId: 'jaegon',
        nickname: '바지사장',
        isAlsoFollowed: true,
        imgId: 'https://source.boringavatars.com/beam/150/jaegon',
      },
      {
        userId: 11,
        loginId: 'flamingyo',
        nickname: '찐남조선인',
        isAlsoFollowed: false,
        imgId: 'https://source.boringavatars.com/beam/150/flamingo1',
      },
      {
        userId: 11,
        loginId: 'yoonhee',
        nickname: '신인류',
        isAlsoFollowed: true,
        imgId: 'https://source.boringavatars.com/beam/150/yoonhee',
      },
      {
        userId: 11,
        loginId: 'onestar',
        nickname: 'oneStar',
        isAlsoFollowed: true,
        imgId: 'https://source.boringavatars.com/beam/150/hanstar',
      },
    ],
  });
}

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
    myContents: [
      {
        feedArticleId: 3,
        feedType: 2,
        user: {
          userId: 11,
          nickname: '마마망',
          profileImgPath: 'https://source.boringavatars.com/beam/150/doyu5',
        },
        content: `여러분 이건 저의 찐 고민입니다.
        
          이 장난감은 고무줄 같은 것을 이용해서 나비가 날아갈 준비를 해놓고, 손 안에 넣어두거나 또는 책 안에 나비를 넣어두고 확! 펼치면 나비들이 진짜 살아 움직이는 것처럼 날아 움직이는 거라는 데요. 가격이 아래 링크를 들어가보면 아시다시피 3만원에 육박한답니다..! 
          
          링크 (https://kr.cukpang.com/kr/?id=9fwyHKVX&mp=1&fbclid=PAAaarWxOKFhda4w-0xFAa55qxsNGONEr9my3fWeRLxdjsBWM7e0d_UHK4wrw_aem_th_AZKXmF2qBNIduj_NvWRbIkwoRowGJJUv0Hz_x0ploWvEo85DiRWAfTxqpu7XURFV8dbRH-3_6EiU7IVM4HqKxA_n&external_browser_redirect=true)
          
          막상 사놓고 망고가 관심을 없어하면 집사는 큰 상심이 될 것 같은데, 새로운 유형의 장난감이라 구미가 당기는 건 사실입니다. 웬만한 시중에 있는 장난감은 참고로 거의 다 써봤답니다!!!!!! 
          
          요즘 망고가 최근들어 가장 좋아하는 장난감은 긴 끈으로 된 장난감인데,(최애 장난감이 반년 주기로 바뀌는 것 같아요 ㅋㅋ) 다양하게 놀면 질리지 않을 것 같아 고민이 됩니닷! `,
        createdAt: new Date('2023-07-15T12:34:56.789Z'),
        modifiedAt: new Date('2023-07-16T12:34:56.789Z'),
        imgPath: ['https://kr.cukpang.com/uploads/13753/20230601155955779.jpeg'],
      },
      {
        feedArticleId: 2,
        feedType: 2,
        user: {
          userId: 11,
          nickname: '마마망', // <- 있어야 할듯...
          profileImgPath: 'https://source.boringavatars.com/beam/150/doyu5', // <- 있어야 할듯...
        },
        content: `이런 글 되나요?
링크 :         https://together.kakao.com/tags/694
댓글만 달아도 호우피해 긴급지원을 위해 1000원이 기부가 된다고 합니다. 폭우로 삶을 위협받고 있는 우리 이웃들에게 조그마한 도움이라도 드리고 싶어요. 다들 무사하시길 바랍니다.`,
        createdAt: new Date('2023-07-16T12:34:56.789Z'),
        modifiedAt: new Date('2023-07-16T12:34:56.789Z'),
        imgPath: [],
      },
      {
        feedArticleId: 1,
        feedType: 1,
        user: {
          userId: 11,
          nickname: '마마망',
          profileImgPath: 'https://source.boringavatars.com/beam/150/doyu5',
        },
        content: 'SKT 가족 할인이 짜장입니다 그 돈 아껴서 태국 스노쿨링 하다 왔어요 거북이도 봤쬬',
        createdAt: new Date('2023-12-23T12:34:56.789Z'),
        modifiedAt: new Date('2023-12-23T12:34:56.789Z'),
        imgPath: [
          'https://images.unsplash.com/photo-1682686581030-7fa4ea2b96c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
          'https://images.unsplash.com/photo-1688574398156-92556aa3cf52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80',
        ],
      },
    ],
  });
}

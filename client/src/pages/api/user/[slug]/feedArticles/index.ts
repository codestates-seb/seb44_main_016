import type { NextApiRequest, NextApiResponse } from 'next';

const myFeeds = [
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
  {
    feedArticleId: 5,
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
  {
    feedArticleId: 6,
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
  {
    feedArticleId: 7,
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
  {
    feedArticleId: 8,
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
  {
    feedArticleId: 9,
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
  {
    feedArticleId: 10,
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
  {
    feedArticleId: 11,
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
  {
    feedArticleId: 12,
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
  {
    feedArticleId: 13,
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
  {
    feedArticleId: 14,
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
  {
    feedArticleId: 15,
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
];
interface QueryParams {
  page: string;
  size: string;
}
export default function financialRecordEdit(req: NextApiRequest, res: NextApiResponse) {
  const queryParams = req.query as unknown as QueryParams;
  const page = parseInt(queryParams.page);
  const size = parseInt(queryParams.size);

  if (isNaN(page) || isNaN(size) || page < 1 || size < 1) {
    res.status(400).json({ message: 'Invalid query parameters' });
    return;
  }

  const from = (page - 1) * size;
  const to = from + size;
  const processedData = myFeeds.slice(from, to);
  const pageData = { page: page, totalPages: Math.ceil(myFeeds.length / size) };

  if (myFeeds.length > 0) {
    res.status(200).json({ data: processedData, pageData: pageData });
  } else {
    res.status(200).json({
      data: [],
      pageData: { page: Math.ceil(page), totalPages: Math.ceil(myFeeds.length / size) },
    });
  }
}

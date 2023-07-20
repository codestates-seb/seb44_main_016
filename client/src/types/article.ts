/** Vote 부분은 추후 생성 예정 */

export interface FaRecData {
  financialRecordId: number; // BigInt
  financialRecordArticleId: number; // BigInt
  category: string;
  faDate: string;
  title: string;
  price: number;
  content: string;
  scope: '가계부 게시글' | '가계부 타임라인';
  user: {
    userId: number; // BigInt
    profileImgPath: string;
    nickname: string;
  };
  imgPath: string[];
}

export interface FaRecUser {
  userId: number;
  nickname: string;
  profileImgPath: string;
}

export interface FaRecHeaderData {
  financialRecordId: number;
  financialRecordName: string;
  memo: string;
  articleCount: number;
  timeLineCount: number;
  imgPath: string;
  isBookmark: boolean;
  users: FaRecUser[];
}

export type FeedArticleResType = {
  feedArticleId: number; // BigInt
  feedType: '절약팁' | '허락해줘';
  user: {
    userId: number; // BigInt
    profileImgPath: string;
    nickname: string;
  };
  content: string;
  imgPath: string[];
  createdAt: string; // ISO-8601
  modifiedAt: string; // ISO-8601
};

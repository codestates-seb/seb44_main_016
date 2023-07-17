export interface FaRecData {
  financialRecordId: number;
  financialRecordArticleId: number;
  category: string;
  faDate: string;
  title: string;
  price: number;
  content: string;
  scope: string;
  user: {
    userId: number;
    profileImgPath: string;
    nickname: string;
  };
  imgPath: string[];
}

export interface FaRecUser {
  userId: string;
  profileImgPath: string;
}

export interface FaRecHeaderData {
  financialRecordId: number;
  financialRecordName: string;
  memo: string;
  articleCount: number;
  faRecTimeline: number;
  imgPath: string;
  isBookmark: boolean;
  users: FaRecUser[];
}

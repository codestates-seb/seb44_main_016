export interface FaRecData {
  financialRecordId: number;
  financialRecordArticleId: number;
  category: string;
  faDate: Date;
  title: string;
  price: number;
  content: string;
  scope: string;
  imgId: string[];
  userId: number;
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
  imgId: string;
  isBookmark: boolean;
  users: FaRecUser[];
}

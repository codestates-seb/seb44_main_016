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

export interface FeedArticle {
  feedArticleId: number;
  feedType: number;
  userNickname: string; // 추가
  profileImg: string; // 추가
  content: string;
  createdAt: Date;
  modifiedAt: Date;
  imageId: number;
  userId: number;
  voteId: number;
  feedArticleHashtagId: number;
  imgId: string[];
}

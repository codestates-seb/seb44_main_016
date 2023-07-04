package com.zerohip.server.feedArticle.service;

import com.zerohip.server.feedArticle.entity.FeedArticle;

public interface FeedArticleService {

  // 피드 게시글 생성
  FeedArticle createFeedArticle(FeedArticle feedArticle);

  // 피드 게시글 조회(단건)
  FeedArticle findFeedArticle(Long feedArticleId);

  // 피드 게시글 조회(전체)
  FeedArticle findAllFeedArticles();
  
  // 피드 게시글 수정
  FeedArticle updateFeedArticle(FeedArticle feedArticle);

  // 피드 게시글 삭제
  void deleteFeedArticle(Long feedArticleId);
}
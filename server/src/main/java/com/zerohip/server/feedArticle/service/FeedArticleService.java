package com.zerohip.server.feedArticle.service;

import com.zerohip.server.feedArticle.entity.FeedArticle;

import java.util.List;

public interface FeedArticleService {

  // 피드 게시글 생성
  FeedArticle createFeedArticle(FeedArticle feedArticle);

    FeedArticle findVerifiedFeedArticle(Long feedArticleId);

    // 피드 게시글 조회(단건)
  FeedArticle findFeedArticle(Long feedArticleId);

  // 피드 게시글 조회(전체)
  List<FeedArticle> findFeedArticles();
  
  // 피드 게시글 수정
  //FeedArticle updateFeedArticle(Long feedArticleId, FeedArticle.Patch patchParam);

  // 피드 게시글 삭제
  void deleteFeedArticle(Long feedArticleId);
}

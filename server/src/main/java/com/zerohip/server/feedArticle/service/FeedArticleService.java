package com.zerohip.server.feedArticle.service;

import com.zerohip.server.feedArticle.dto.FeedArticleDto;
import com.zerohip.server.feedArticle.entity.FeedArticle;
import org.springframework.data.domain.Page;

public interface FeedArticleService {

  // 피드 게시글 생성
  FeedArticle createFeedArticle(String author, FeedArticle feedArticle);

  FeedArticle findVerifiedFeedArticle(Long articleId);

  // 피드 게시글 조회(단건)
  FeedArticle findFeedArticle(Long articleId);

  // 피드 게시글 조회(전체)
  Page<FeedArticle> findFeedArticles(Long articleId, int page, int size);

  // 특정 사용자의 피드 게시글 조회
  Page<FeedArticle> findUserFeedArticles(Long userId, int page, int size);
  
  // 피드 게시글 수정
  FeedArticle updateFeedArticle(String author, Long articleId, FeedArticleDto.Patch patchParam);

  // 피드 게시글 삭제
  void deleteFeedArticle(String author, Long articleId);
}

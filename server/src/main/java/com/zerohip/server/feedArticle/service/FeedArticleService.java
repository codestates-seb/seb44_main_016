package com.zerohip.server.feedArticle.service;

import com.zerohip.server.feedArticle.dto.FeedArticleDto;
import com.zerohip.server.feedArticle.entity.FeedArticle;
import com.zerohip.server.user.entity.User;
import org.springframework.data.domain.Page;

import java.util.List;

public interface FeedArticleService {

  // 피드 게시글 생성
  FeedArticle createFeedArticle(User author, FeedArticle feedArticle);

  FeedArticle findVerifiedFeedArticle(Long feedArticleId);

  // 피드 게시글 조회(단건)
  FeedArticle findFeedArticle(Long feedArticleId);

  // 피드 게시글 조회(전체)
  Page<FeedArticle> findFeedArticles(Long FeedArticleId, int page, int size);
  
  // 피드 게시글 수정
  FeedArticle updateFeedArticle(User author, Long feedArticleId, FeedArticleDto.Patch patchParam);

  // 피드 게시글 삭제
  void deleteFeedArticle(User author,Long feedArticleId);
}

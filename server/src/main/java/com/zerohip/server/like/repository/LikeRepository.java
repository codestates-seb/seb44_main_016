package com.zerohip.server.like.repository;

import com.zerohip.server.like.entity.Likes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Likes, Long> {
    Long countByFinancialRecordArticle_ArticleId(Long financialRecordArticleId);

    Long countByUser_UserIdAndFinancialRecordArticle_ArticleId(Long userId, Long financialRecordArticleId);

    void deleteByUser_UserIdAndFinancialRecordArticle_ArticleId(Long userId, Long financialRecordArticleId);
}

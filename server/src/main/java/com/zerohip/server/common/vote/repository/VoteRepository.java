package com.zerohip.server.common.vote.repository;

import com.zerohip.server.common.vote.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {
    Vote save(Vote vote);

    List<Vote> findSavingVotesByFeedArticle_ArticleId(Long articleId);

    List<Vote> findFlexVotesByFeedArticle_ArticleId(Long articleId);

    List<Vote> findSavingVotesByUser_UserId(Long userId);

    List<Vote> findFlexVotesByUser_UserId(Long userId);

    @Query(value = "SELECT COUNT(v.id) FROM Vote v WHERE v.feedArticle.articleId = :articleId AND v.voteType = 'SAVING'")
    int getSavingVoteCountByArticleId(@Param("articleId") Long articleId);

    @Query(value = "SELECT COUNT(v.id) FROM Vote v WHERE v.feedArticle.articleId = :articleId AND v.voteType = 'FLEX'")
    int getFlexVoteCountByArticleId(@Param("articleId") Long articleId);

    Vote findByFeedArticle_ArticleId(Long articleId);

    @Query("SELECT v.feedArticle.id, SUM(CASE WHEN v.voteType = 'FLEX' THEN -1 ELSE 1 END) FROM Vote v WHERE v.feedArticle.createdAt >= :oneMonthAgo GROUP BY v.feedArticle.id")
    List<Object[]> countVotesForArticlesFromLastMonth(@Param("oneMonthAgo") LocalDateTime oneMonthAgo);
}

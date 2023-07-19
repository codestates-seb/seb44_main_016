package com.zerohip.server.common.vote.repository;

import com.zerohip.server.common.vote.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {
        Vote save(Vote vote);

        List<Vote> findSavingVotesByFeedArticleId(Long feedArticleId);

        List<Vote> findFlexVotesByFeedArticleId(Long feedArticleId);

        List<Vote> findSavingVotesByUserId(Long userId);

        List<Vote> findFlexVotesByUserId(Long userId);

        @Query(value = "SELECT COUNT(v.id) FROM Vote v WHERE v.feedArticle.articleId = :feedArticleId AND v.voteType = 'SAVING'")
        int getSavingVoteCountByFeedArticleId(@Param("feedArticleId") Long feedArticleId);

        @Query(value = "SELECT COUNT(v.id) FROM Vote v WHERE v.feedArticle.articleId = :feedArticleId AND v.voteType = 'FLEX'")
        int getFlexVoteCountByFeedArticleId(@Param("feedArticleId") Long feedArticleId);

    }

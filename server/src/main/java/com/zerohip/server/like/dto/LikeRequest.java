package com.zerohip.server.like.dto;

import com.zerohip.server.common.comment.entity.Comment;
import com.zerohip.server.feedArticle.entity.FeedArticle;
import com.zerohip.server.financialRecordArticle.entity.FinancialRecordArticle;
import com.zerohip.server.like.entity.Likes;
import com.zerohip.server.user.entity.User;
import lombok.Getter;

@Getter
public class LikeRequest {
    private Long userId;
    private Long feedArticleId;
    private Long financialRecordArticleId;
    private Long commentId;

    public Likes toEntity(User user, FeedArticle feedArticle, FinancialRecordArticle financialRecordArticle, Comment comment) {
        return Likes.builder()
                .user(user)
                .feedArticle(feedArticleId != null ? feedArticle : null)
                .financialRecordArticle(financialRecordArticleId != null ? financialRecordArticle : null)
                .comment(commentId != null ? comment : null)
                .build();
    }
}

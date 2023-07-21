package com.zerohip.server.like.entity;

import com.zerohip.server.common.audit.Auditable;
import com.zerohip.server.common.comment.entity.Comment;
import com.zerohip.server.feedArticle.entity.FeedArticle;
import com.zerohip.server.financialRecordArticle.entity.FinancialRecordArticle;
import com.zerohip.server.user.entity.User;
import lombok.*;

import javax.persistence.*;

@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "likes")
@NoArgsConstructor
@Getter
@Entity
public class Likes extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likeId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "feed_article_id")
    private FeedArticle feedArticle;

    @ManyToOne
    @JoinColumn(name = "financial_record_article_id")
    private FinancialRecordArticle financialRecordArticle;

    @ManyToOne
    @JoinColumn(name = "comment_id")
    private Comment comment;
}

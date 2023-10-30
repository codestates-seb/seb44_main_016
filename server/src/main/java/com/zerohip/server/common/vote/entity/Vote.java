package com.zerohip.server.common.vote.entity;

import com.zerohip.server.common.audit.Auditable;
import com.zerohip.server.common.voteType.VoteType;
import com.zerohip.server.feedArticle.entity.FeedArticle;
import com.zerohip.server.user.entity.User;
import lombok.*;

import javax.persistence.*;

@Entity
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Table(name = "votes")
public class Vote extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feed_article_id")
    private FeedArticle feedArticle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VoteType voteType;


    public Long getId() {
        return id;
    }

    public FeedArticle getFeedArticle() {
        return feedArticle;
    }

    public User getUser() {
        return user;
    }

    public VoteType getVoteType() {
        return voteType;
    }

    public void setVoteType(VoteType voteType) {
        this.voteType = voteType;
    }
}

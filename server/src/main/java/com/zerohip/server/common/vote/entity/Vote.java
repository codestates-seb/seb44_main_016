package com.zerohip.server.common.vote.entity;

import com.zerohip.server.common.voteType.VoteType;
import com.zerohip.server.feedArticle.entity.FeedArticle;
import com.zerohip.server.user.entity.User;

import javax.persistence.*;

@Entity
@Table(name = "votes")
public class Vote {
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
    @Column(nullable = false)
    private int voteCount;

    public Vote(FeedArticle feedArticle, User user, VoteType voteType) {
    }

    public Vote() {

    }

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

    public void increaseVoteCount() {
        this.voteCount++;
    }
    public void decreaseVoteCount() {
        this.voteCount--;
    }
}
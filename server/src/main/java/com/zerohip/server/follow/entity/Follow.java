package com.zerohip.server.follow.entity;

import com.zerohip.server.user.entity.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@Getter
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long followId;

    // 사용될 때 로딩
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "follower_user_id")
    private User followerId;

    // 사용될 때 로딩
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "following_user_id")
    private User followingId;

    public long getFollowingUserId() {
        return followingId.getUserId();
    }

    public long getFollowerUserId() {
        return followerId.getUserId();
    }
}


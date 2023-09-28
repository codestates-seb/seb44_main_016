package com.zerohip.server.follow.entity;

import com.zerohip.server.follow.service.FollowService;
import com.zerohip.server.user.entity.User;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

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
    private User followingId; // 구독 버튼 누를 때 기본키 생성 = 기준

    @ColumnDefault("false")
    private Boolean isFollowing;

    @ColumnDefault("false")
    private Boolean isFollowed; // 다른 사용자가 나를

    // follow 테이블이 업데이트 될 때, 리스너 이용하여 값 업뎃 필요
    @ColumnDefault("false")
    private Boolean isFriend;

    public Long getFollowingUserId() {
        return followingId.getUserId();
    }

    public Long getFollowerUserId() {
        return followerId.getUserId();
    }
}


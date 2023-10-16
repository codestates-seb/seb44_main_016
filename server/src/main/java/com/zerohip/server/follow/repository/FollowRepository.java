package com.zerohip.server.follow.repository;

import com.zerohip.server.follow.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    @Query("select f from Follow f where f.followingId.loginId = :followingId and f.followerId.loginId = :followerId ")
    Optional<Follow> findFollow(String followingId, String followerId);

    @Query("select count(*) from Follow f where f.followerId.loginId = :loginId")
    int followerCount(String loginId);

    @Query("select count(*) from Follow f where f.followingId.loginId = :loginId")
    int followingCount(String loginId);

    @Query("select case when count(f) > 0 then true else false end from Follow f where f.followerId.loginId = :followerId AND f.followingId.loginId = :followingId")
    boolean checkFollowed(String followingId, String followerId);

    @Query("select case when count(f) > 0 then true else false end from Follow f where f.followerId.loginId = :followingId and f.followingId.loginId = :followerId ")
    boolean checkFollowing(String followerId, String followingId);

}

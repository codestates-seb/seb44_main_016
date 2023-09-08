package com.zerohip.server.follow.repository;

import com.zerohip.server.follow.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    @Query("select f from Follow f where f.followingId.userId = :followingId and f.followerId.userId = :followerId ")
    Optional<Follow> findFollow(Long followingId, Long followerId);


//    @Query("select f.followId from Follow f where f.followingId.userId = :authUserId and f.followerId.userId = :followingUserId")
//    Optional<Follow> findFollowId(Long authUserId, Long followingUserId);

    @Query("select count(*) from Follow f where f.followerId.userId = :userId")
    int followerCount(Long userId);

    @Query("select count(*) from Follow f where f.followingId.userId = :userId")
    int followingCount(Long userId);

    @Query("select case when count(f) > 0 then true else false end from Follow f where f.followerId.userId = :followingId and f.followingId.userId = :followerId ")
    Boolean checkFollowed(Long followingId, Long followerId);
}

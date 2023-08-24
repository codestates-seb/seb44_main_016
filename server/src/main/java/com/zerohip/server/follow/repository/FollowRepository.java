package com.zerohip.server.follow.repository;

import com.zerohip.server.follow.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    @Query("select f from Follow f where f.followingId.userId = :followingId and f.followerId.userId = :followerId ")
    Optional<Follow> findFollowId(Long followingId, Long followerId);

    @Query("select count(f) > 0 from Follow f where f.followingId.userId = :checkUserId and f.followerId.userId = :authUserId")
    Boolean checkFollowingId(Long authUserId, Long checkUserId);
}

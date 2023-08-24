package com.zerohip.server.follow.service;

import com.zerohip.server.common.exception.BusinessLogicException;
import com.zerohip.server.common.exception.ExceptionCode;
import com.zerohip.server.follow.entity.Follow;
import com.zerohip.server.follow.repository.FollowRepository;
import com.zerohip.server.user.entity.User;
import com.zerohip.server.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class FollowService {

    private final FollowRepository followRepository;
    private final UserService userService;

    public Follow addFollowing(String authorLoginId, Long followingUserId) {

        Long authUserId = userService.findUserByLoginId(authorLoginId).getUserId();
        if (authUserId == followingUserId) {
            throw new BusinessLogicException(ExceptionCode.SAME_USER);
        }

        verifiedFollowing(authUserId, followingUserId);
        Follow follow = new Follow();
        follow.setFollowerId(findFollowUser(authUserId));
        follow.setFollowingId(findFollowUser(followingUserId));

        return followRepository.save(follow);
    }


    public void deleteFollowing(String authorLoginId, Long followId) {

        Long authUserId = userService.findUserByLoginId(authorLoginId).getUserId();
        Optional<Follow> optionalFollow = followRepository.findById(followId);
        Follow follow = optionalFollow.orElseThrow(() -> new BusinessLogicException(ExceptionCode.FOLLOWING_NOT_FOUND));

        if (authUserId != follow.getFollowingId().getUserId()) {

            throw new BusinessLogicException(ExceptionCode.USER_FOLLOW_MISMATCH);
        }

        followRepository.delete(follow);
    }


    public void deleteFollower(String authorLoginId, Long followId) {

        Long authUserId = userService.findUserByLoginId(authorLoginId).getUserId();
        Optional<Follow> optionalFollow = followRepository.findById(followId);
        Follow follow = optionalFollow.orElseThrow(() -> new BusinessLogicException(ExceptionCode.FOLLOWER_NOT_FOUND));

        if (authUserId != follow.getFollowerId().getUserId()) {

            throw new BusinessLogicException(ExceptionCode.USER_FOLLOW_MISMATCH);
        }

        followRepository.delete(follow);
    }






//    private Follow checkFollow(String authorLoginId, Long followId) {
//
//        Optional<Follow> optionalFollow = followRepository.findById(followId);
//        Follow follow = optionalFollow.orElseThrow(() -> new BusinessLogicException(ExceptionCode.FOLLOWER_NOT_FOUND));
//
//        return follow;
//    }


//  ---
    private void verifiedFollowing(Long authUserId, Long followId) {

        Follow findFollow = followRepository.findFollowId(authUserId, followId).orElse(null);
        if (findFollow != null) {
            throw new BusinessLogicException(ExceptionCode.FOLLOW_ALREADY_EXIST);
        }
    }

    private User findFollowUser(Long userId) {

        return userService.findUserByUserId(userId);
    }
}

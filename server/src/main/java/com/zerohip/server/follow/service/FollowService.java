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

    public Follow addFollowing(String authorLoginId, String followingUserId) {

        if (authorLoginId.equals(followingUserId)) {
            throw new BusinessLogicException(ExceptionCode.SAME_USER);
        }

        verifiedFollowing(authorLoginId, followingUserId);

        Follow follow = new Follow();
        follow.setFollowerId(findFollowUserByLoginId(followingUserId));
        follow.setFollowingId(findFollowUserByLoginId(authorLoginId));
        followRepository.save(follow);

        follow.setIsFollowed(followRepository.checkFollowed(followingUserId, authorLoginId));
        follow.setIsFollowing(followRepository.checkFollowing(authorLoginId, followingUserId));

        if (follow.getIsFollowing() && follow.getIsFollowed()) {
            followRepository.findFollow(followingUserId, authorLoginId)
                    .ifPresent(f -> f.setIsFollowed(true));
        }

        return followRepository.save(follow);
    }


    public void deleteFollowing(String authorLoginId, Long followId) {

        Long authUserId = userService.findUserByLoginId(authorLoginId).getUserId();
        Optional<Follow> optionalFollow = followRepository.findById(followId);
        Follow follow = optionalFollow.orElseThrow(() -> new BusinessLogicException(ExceptionCode.FOLLOWING_NOT_FOUND));

        if (authUserId != follow.getFollowingUserId()) {

            throw new BusinessLogicException(ExceptionCode.USER_FOLLOW_MISMATCH);
        }

        String followingId = follow.getFollowerId().getLoginId();
        Optional<Follow> optionalFollower = followRepository.findFollow(followingId, authorLoginId);

        if (optionalFollower.isPresent() && optionalFollower.get().getIsFollowed()) {
            Follow follower = optionalFollower.get();
            follower.setIsFollowed(false);
            followRepository.save(follower);
        }

        followRepository.delete(follow);
    }


    public void deleteFollower(String authorLoginId, Long followId) {

        Long authUserId = userService.findUserByLoginId(authorLoginId).getUserId();
        Optional<Follow> optionalFollow = followRepository.findById(followId);
        Follow follow = optionalFollow.orElseThrow(() -> new BusinessLogicException(ExceptionCode.FOLLOWER_NOT_FOUND));

        if (authUserId != follow.getFollowerUserId()) {

            throw new BusinessLogicException(ExceptionCode.USER_FOLLOW_MISMATCH);
        }

        followRepository.delete(follow);
    }


    public Boolean checkFriend(String authUserId, String otherUserId) {

        Optional<Follow> findFollowing = followRepository.findFollow(otherUserId, authUserId);
        Optional<Follow> findFollower = followRepository.findFollow(authUserId, otherUserId);

        if (findFollowing.isPresent() && findFollower.isPresent()) {
            return true;
        }
        return false;
    }


    public Follow checkAuthor(String loginId, String otherUserLoginId) {

        User user = userService.findUserByLoginId(loginId);
        User otherUser = userService.findUserByLoginId(otherUserLoginId);

        Follow findFollow = followRepository.findFollow(user.getLoginId(), otherUser.getLoginId()).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.FOLLOW_NOT_FOUND));

        if (checkFriend(loginId, otherUserLoginId)) {
            findFollow.setIsFriend(true);
        }
        else findFollow.setIsFriend(false);

        return findFollow;
    }


//  ---


    private void verifiedFollowing(String authUserId, String followingUserId) {

        Follow findFollow = followRepository.findFollow(authUserId, followingUserId).orElse(null);
        if (findFollow != null) {
            throw new BusinessLogicException(ExceptionCode.FOLLOW_ALREADY_EXIST);
        }
    }


    private User findFollowUser(Long userId) {

        return userService.findUserByUserId(userId);
    }

    private User findFollowUserByLoginId(String loginId) {

        return userService.findUserByLoginId(loginId);
    }

}

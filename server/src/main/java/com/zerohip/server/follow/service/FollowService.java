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

//        Long authUserId = userService.findUserByLoginId(authorLoginId).getUserId();
        if (authorLoginId.equals(followingUserId)) {
            throw new BusinessLogicException(ExceptionCode.SAME_USER);
        }

        verifiedFollowing(authorLoginId, followingUserId);

        Follow follow = new Follow();
        follow.setFollowerId(findFollowUserByLoginId(followingUserId));
        follow.setFollowingId(findFollowUserByLoginId(authorLoginId));
        follow.setIsFollowing(true);
        follow.setIsFollow(followRepository.checkFollowed(authorLoginId, followingUserId));
//        follow.setIsFollowing(followRepository.checkFollowing(authUserId, followingUserId));

        return followRepository.save(follow);
    }


    public void deleteFollowing(String authorLoginId, Long followId) {

        Long authUserId = userService.findUserByLoginId(authorLoginId).getUserId();
        Optional<Follow> optionalFollow = followRepository.findById(followId);
        Follow follow = optionalFollow.orElseThrow(() -> new BusinessLogicException(ExceptionCode.FOLLOWING_NOT_FOUND));

        if (authUserId != follow.getFollowingUserId()) {

            throw new BusinessLogicException(ExceptionCode.USER_FOLLOW_MISMATCH);
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


    public Follow findFollow(String authUserId, String otherUserId) {

        Optional<Follow> findFollow = followRepository.findFollow(authUserId, otherUserId);

        if (findFollow.isPresent()) {

            Follow follow = findFollow.get();
            follow.setIsFollow(followRepository.checkFollowed(authUserId, otherUserId));
            return followRepository.save(follow);

        }
        else return null;
    }


    public Follow checkAuthor(String loginId, String otherUserLoginId) {

        User user = userService.findUserByLoginId(loginId);
        User otherUser = userService.findUserByLoginId(otherUserLoginId);

        Follow findFollow = followRepository.findFollow(user.getLoginId(), otherUser.getLoginId()).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.FOLLOW_NOT_FOUND));

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

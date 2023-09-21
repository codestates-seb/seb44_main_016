package com.zerohip.server.follow.controller;

import com.zerohip.server.common.dto.ResponseDto;
import com.zerohip.server.common.exception.BusinessLogicException;
import com.zerohip.server.common.exception.ExceptionCode;
import com.zerohip.server.follow.entity.Follow;
import com.zerohip.server.follow.mapper.FollowMapper;
import com.zerohip.server.follow.repository.FollowRepository;
import com.zerohip.server.follow.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/friend")
public class FollowController {


    private final FollowMapper followMapper;
    private final FollowService followService;


    @PostMapping("/following/{login-id}")
    public ResponseEntity<?> postFollow(@AuthenticationPrincipal String authorId,
                                        @PathVariable("login-id") String followingUserId) {

        checkNull(authorId);
        Follow follow = followService.addFollowing(authorId, followingUserId);
        return new ResponseEntity<>(followMapper.followToFollowResponseDto(follow), HttpStatus.CREATED);

    }


    @DeleteMapping("/following/{follow-id}")
    public ResponseEntity<?> deleteFollowing(@AuthenticationPrincipal String authorId,
                                          @PathVariable("follow-id") @Positive Long followId) {

        checkNull(authorId);
        followService.deleteFollowing(authorId, followId);
        return new ResponseEntity<>("팔로잉 취소 완료", HttpStatus.OK);

    }


    @DeleteMapping("/follower/{follow-id}")
    public ResponseEntity<?> deleteFollower(@AuthenticationPrincipal String authorId,
                                             @PathVariable("follow-id") @Positive Long followId) {

        checkNull(authorId);
        followService.deleteFollower(authorId, followId);
        return new ResponseEntity<>("팔로워 삭제 완료", HttpStatus.OK);

    }


    @GetMapping("/profile/check-user/{login-id}")
    public ResponseEntity<?> checkAuthor(@AuthenticationPrincipal String authorId,
                                         @PathVariable ("login-id") String otherUserLoginId) {

        if ("anonymousUser".equals(authorId)) {
            return new ResponseEntity<>("Guest User",HttpStatus.OK);
        }

        return new ResponseEntity<>(followMapper.followToFollowResponseDto(followService.checkAuthor(authorId, otherUserLoginId)), HttpStatus.OK);
    }


    private static void checkNull(String authorId) {
        if (authorId == null) {
            throw new BusinessLogicException(ExceptionCode.AUTHOR_UNAUTHORIZED);
        }
    }
}

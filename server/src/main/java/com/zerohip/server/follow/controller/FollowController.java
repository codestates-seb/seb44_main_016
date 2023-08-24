package com.zerohip.server.follow.controller;

import com.zerohip.server.common.dto.ResponseDto;
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
@RequestMapping("/fiend")
public class FollowController {

    private final FollowMapper followMapper;
    private final FollowService followService;

    @PostMapping("/following/{user-id}")
    public ResponseEntity<?> postFollow(@AuthenticationPrincipal String authorLoginId,
                                        @PathVariable("user-id") @Positive Long followingUserId) {

        Follow follow = followService.addFollowing(authorLoginId, followingUserId);

        return new ResponseEntity<>(followMapper.followToFollowResponseDto(follow), HttpStatus.CREATED);
    }


    @DeleteMapping("/following/{follow-id}")
    public ResponseEntity<?> deleteFollowing(@AuthenticationPrincipal String authorLoginId,
                                          @PathVariable("follow-id") @Positive Long followId) {

        followService.deleteFollowing(authorLoginId, followId);

        return new ResponseEntity<>("삭제 완료", HttpStatus.OK);
    }

    @DeleteMapping("/follower/{follow-id}")
    public ResponseEntity<?> deleteFollower(@AuthenticationPrincipal String authorLoginId,
                                             @PathVariable("follow-id") @Positive Long followId) {

        followService.deleteFollowing(authorLoginId, followId);

        return new ResponseEntity<>("삭제 완료", HttpStatus.OK);
    }

    @GetMapping("/following-list/")
}

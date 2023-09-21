package com.zerohip.server.user.controller;

import com.zerohip.server.common.exception.BusinessLogicException;
import com.zerohip.server.common.exception.ExceptionCode;
import com.zerohip.server.follow.mapper.FollowMapper;
import com.zerohip.server.user.dto.UserDto;
import com.zerohip.server.user.entity.User;
import com.zerohip.server.user.mapper.UserMapper;
import com.zerohip.server.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * @AuthenticationPrincipal : 필터에서 검증된 jwt 사용자 정보를 스프링 시큐리티가 User author 에게 주입해주는 에너테이션
 * 토큰에서 loginId 추출 가능
 */

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Validated
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;


    // 회원 가입
    @PostMapping("/signup")
    public ResponseEntity postUser(@RequestBody @Valid UserDto.Post userPostDto) {

        User user = userMapper.userPostDtoToUser(userPostDto);
        userService.createUser(user);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    // 회원 탈퇴
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUser(@AuthenticationPrincipal String authorId,
                                        @RequestBody UserDto.CheckPassword checkPasswordDto) {

        checkNull(authorId);
        userService.deleteUser(authorId, checkPasswordDto.getPassword());
        return new ResponseEntity<>(HttpStatus.OK);
    }


    // 회원 조회 (for client)
    @GetMapping("/info")
    public ResponseEntity<?> userInfoForClient(@AuthenticationPrincipal String authorId) {

        checkNull(authorId);
        User findUserInfo = userService.findUserByLoginId(authorId);
        return new ResponseEntity<>(userMapper.userToUserResponseDto(findUserInfo), HttpStatus.OK);
    }


    // 회원 조회 (for user) -> 추후 수정 예정
    @GetMapping("/profile/{login-id}")
    public ResponseEntity<?> findUserProfile(@PathVariable("login-id") String loginId) {

        return new ResponseEntity<>(userMapper.userToMyPageResponse(userService.findUser(loginId)), HttpStatus.OK);
    }


    // 마이페이지 조회
    @GetMapping("/mypage")
    public ResponseEntity<?> getMyPage(@AuthenticationPrincipal String authorId) {

        checkNull(authorId);
        return new ResponseEntity<>(userMapper.userToMyPageResponse(userService.getMypage(authorId)), HttpStatus.OK);
    }


    // 회원 정보 수정
    @PatchMapping("/mypage/update")
    public ResponseEntity<?> patchUser(@AuthenticationPrincipal String authorId,
                                       @RequestBody @Valid UserDto.Patch userPatchDto) {

        checkNull(authorId);
        User user = userMapper.userPatchDtoToUser(userPatchDto);
        userService.updateUser(authorId, user);

        return new ResponseEntity<>(HttpStatus.OK);
    }


    private static void checkNull(String authorId) {
        if (authorId == null) {
            throw new BusinessLogicException(ExceptionCode.AUTHOR_UNAUTHORIZED);
        }
    }
}



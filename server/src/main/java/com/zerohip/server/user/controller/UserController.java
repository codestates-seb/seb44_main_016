package com.zerohip.server.user.controller;

import com.zerohip.server.common.exception.BusinessLogicException;
import com.zerohip.server.common.exception.ExceptionCode;
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
    private final UserMapper mapper;

    @PostMapping("/signup")
    public ResponseEntity postUser(@Valid @RequestBody UserDto.Post userPostDto) {

        User user = mapper.userPostDtoToUser(userPostDto);
        userService.createUser(user);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUser(@AuthenticationPrincipal User author,
                                        @RequestBody UserDto.CheckPassword checkPasswordDto) {

        if (author == null) {
            throw new BusinessLogicException(ExceptionCode.AUTHOR_UNAUTHORIZED);
        }

        userService.deleteUser(author, checkPasswordDto.getPassword());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}




    // (deleteUser 내부로 이동)
//    @PostMapping("/checkpw")
//    public ResponseEntity<?> checkPassword(@AuthenticationPrincipal User author,
//                                           @RequestBody UserDto.CheckPassword checkPasswordDto) {
//
//        User originUser = userService.findUserByLoginId(author.getLoginId());
//        User checkPasswordUser = mapper.checkPasswordToUser(checkPasswordDto);
//        Boolean checkedPassword = userService.checkedPassword(originUser.getLoginId(), checkPasswordUser.getPassword());
//        UserDto.CheckPasswordResponse response = mapper.userToCheckPasswordResponse(checkPasswordUser);
//        if(checkedPassword == true){response.setCheck(true);
//        } else {response.setCheck(false);}
//        return new ResponseEntity<>(response,HttpStatus.OK);
//    }





//    @GetMapping("/gegege")
//    public ResponseEntity checkPassword(@AuthenticationPrincipal User author) {
//
//        User user = new User();
//        user.setUserId(author.getUserId());
//        user.setEmail(author.getEmail());
//        user.setLoginId(author.getLoginId());
//        user.setPassword(author.getPassword());
//        user.setNickname(author.getNickname());
//
//        return new ResponseEntity<>(mapper.userToUserResponseDto(user),HttpStatus.OK);
//    }
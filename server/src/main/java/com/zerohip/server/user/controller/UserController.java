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
 * @AuthenticationPrincipal : 필터에서 검증된 jwt 사용자 정보를 스프링 시큐리티가 User author 에게 주입해주는 에너테이션.
 */

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Validated
public class UserController {

    private final UserService userService;
    private final UserMapper mapper;

    @PostMapping("/signup")
    public ResponseEntity postUser(@Valid @RequestBody UserDto.Post userPostDto){

        User user = mapper.userPostDtoToUser(userPostDto);
        userService.createUser(user);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}

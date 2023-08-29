package com.zerohip.server.user.service;

import com.zerohip.server.user.entity.User;
import org.springframework.data.domain.Page;

import java.util.List;

public interface UserService {

    // User 생성
    User createUser(User user);

    // User 조회(단건)
    User findUserByUserId(Long userId);

    User findUserByLoginId(String loginId);

    User findUserByEmail(String email);

    Page<User> findUserPage(String loginId, int page, int size);


    // User 조회(전체)
    List<User> findUsers();

    // User 수정
    User updateUser(String loginId, User user);

    // User 삭제
    void deleteUser(String loginId, String password);

}
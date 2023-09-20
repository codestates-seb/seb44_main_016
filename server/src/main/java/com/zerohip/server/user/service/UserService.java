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

    User getMypage(String loginId);

    User findUser(Long userId);

    // User 조회
    List<User> findUsers();

    User checkAuthor(String loginId, String otherUser);

    // User 수정
    User updateUser(String loginId, User user);

    // User 삭제
    void deleteUser(String loginId, String password);

}
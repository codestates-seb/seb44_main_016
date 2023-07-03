package com.zerohip.server.user.service;

import com.zerohip.server.user.entity.User;

public interface UserService {

  // User 생성
  User createUser(User user);

  // User 조회(단건)
  User findUser(Long userId);

  // User 조회(전체)
  User findAllUsers();

  // User 수정
  User updateUser(User user);

  // User 삭제
  void deleteUser(Long userId);
}

package com.zerohip.server.user.service;

import com.zerohip.server.user.entity.User;

import java.util.List;

public interface UserService {

  // User 생성
  User createUser(User user);

  // User 조회(단건)
  User findUser(Long userId);

  // User 조회(전체)
  List<User> findUsers();

  // User 수정
  //User updateUser(Long userId, User.Patch patchParam);

  // User 삭제
  void deleteUser(Long userId);
}

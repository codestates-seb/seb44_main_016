package com.zerohip.server.user.repository;

import com.zerohip.server.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    public Optional<User> findUserByEmail(String email);
    public Optional<User> findUserByUserId(Long userId);

    public Optional<User> findUserByLoginId(String loginId);
}


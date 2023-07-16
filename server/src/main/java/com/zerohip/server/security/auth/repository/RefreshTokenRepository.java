package com.zerohip.server.security.auth.repository;

import com.zerohip.server.security.auth.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByLoginId(String loginId);
    Optional<RefreshToken> findByToken(String token);
}

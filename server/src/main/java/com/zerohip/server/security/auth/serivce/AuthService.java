package com.zerohip.server.security.auth.serivce;

import com.zerohip.server.security.auth.entity.RefreshToken;
import com.zerohip.server.security.auth.repository.RefreshTokenRepository;
import com.zerohip.server.security.provider.JwtStatus;
import com.zerohip.server.security.provider.JwtTokenizer;
import com.zerohip.server.user.entity.User;
import com.zerohip.server.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtTokenizer jwtTokenizer;
    private final UserService userService;

    public String createAccessToken(String refreshToken) {


        if (!verifiedJwtStatus(refreshToken)) {
            log.info("# Refresh Token has Expired");
            return null;
        }

        Authentication authentication = jwtTokenizer.getAuthentication(refreshToken);
        User user = userService.findUserByLoginId(authentication.getName());

        Map<String, Object> claims = new HashMap<>();
        claims.put("loginId", user.getLoginId());
        claims.put("roles", user.getRoles());

        String subject = user.getLoginId();

        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        log.info("# Reissue Access Token");

        return jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

    }

    public void deleteRefreshToken(String refreshToken) {

        Authentication authentication = jwtTokenizer.getAuthentication(refreshToken);
        User user = userService.findUserByLoginId(authentication.getName());

        RefreshToken findRefreshToken = findVerifiedJwtToken(user.getLoginId());

        refreshTokenRepository.delete(findRefreshToken);
    }



    private boolean verifiedJwtStatus(String refreshToken) {

        JwtStatus jwtStatus = jwtTokenizer.validateToken(refreshToken);

        if (jwtStatus == JwtStatus.EXPIRED || refreshTokenRepository.findByToken(refreshToken).isEmpty()) {
            return false;
        }
        return true;
    }


    private RefreshToken findVerifiedJwtToken(String loginId) {

        Optional<RefreshToken> optionalToken = refreshTokenRepository.findByLoginId(loginId);
        RefreshToken findToken = optionalToken.orElseThrow(() ->
                new AuthenticationCredentialsNotFoundException("사용자 계정의 인증 정보를 찾을 수 없습니다. 관리자에게 문의하세요."));

        return findToken;
    }
}

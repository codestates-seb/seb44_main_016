package com.zerohip.server.security.filter;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.zerohip.server.security.auth.entity.RefreshToken;
import com.zerohip.server.security.auth.repository.RefreshTokenRepository;
import com.zerohip.server.security.provider.JwtTokenizer;
import com.zerohip.server.user.dto.UserDto;
import com.zerohip.server.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

// 로그인 인증 요청 처리 엔트리포인트
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    // DI 받은 AuthenticationManager 로 로그인 인증 정보를 전달받아 인증 여부 판단
    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;
    private final RefreshTokenRepository refreshTokenRepository;


    // 인증 시도 로직 구현
    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {

        ObjectMapper objectMapper = new ObjectMapper(); // 전달받은 인증 정보 역직렬화 위한 ObjectMapper 인스턴스 생성
        UserDto.Login loginDto = objectMapper.readValue(request.getInputStream(), UserDto.Login.class); // 역직렬화


        // 인증 정보를 포함한 UsernamePasswordAuthenticationToken 토큰 생성 (데이터 -> 유저네임패스워드토큰에 할당)
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getLoginId(), loginDto.getPassword());

        return authenticationManager.authenticate(authenticationToken); // authenticationManager 에게 인증처리 위임
    }

    // 인증 성공할 경우 호출
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws ServletException, IOException {

        User user = (User) authResult.getPrincipal(); // Authentication 에 저장된 인증된 사용자의 객체 가져옴

        String accessToken = delegateAccessToken(user); // accessToken 생성
        String refreshToken = delegateRefreshToken(user); // refreshToken 생성

        response.setHeader("Authorization", "Bearer " + accessToken);
//        response.setHeader("Refresh", refreshToken);

        // 리프레쉬 토큰 쿠키화
        ResponseCookie cookie = ResponseCookie.from("Refresh", refreshToken)
                .domain("zerohip.co.kr")
                .maxAge(24 * 60 * 60)
                .path("/")
                .secure(true)
                .sameSite("None")
                .httpOnly(true)
                .build();

        response.setHeader("Set-Cookie", cookie.toString());


        //onAuthenticationSuccess() : UserAuthenticationSuccessHandler 호출
        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
    }

    // accessToken 생성
    private String delegateAccessToken(User user) {

        Map<String, Object> claims = new HashMap<>();
        claims.put("loginId", user.getLoginId());
        claims.put("roles", user.getRoles());

        String subject = user.getLoginId();

        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    // refreshToken 생성
    private String delegateRefreshToken(User user) {

        String subject = user.getLoginId();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        // refresh token  : redis 사용 시 수정 예정
        refreshTokenRepository.findByLoginId(user.getLoginId())
                .ifPresentOrElse(
                        re -> {
                            re.changeToken(refreshToken);
                            refreshTokenRepository.save(re);
                            log.info("# IssueRefreshToken | change token"); // 이미 생성된 토큰이 존재할 경우, 토큰 재발행 후 저장
                        },
                        () -> {
                            RefreshToken token = RefreshToken.createToken(user.getLoginId(), refreshToken); // 없다면 토큰 생성 후, 저장
                            refreshTokenRepository.save(token);
                            log.info("# IssueRefreshToken | save login : {}, token : {}", token.getLoginId(), token.getToken());
                        });

        return refreshToken;
    }
}

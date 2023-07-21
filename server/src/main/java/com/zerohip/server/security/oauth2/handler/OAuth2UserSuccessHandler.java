package com.zerohip.server.security.oauth2.handler;

import com.zerohip.server.security.auth.entity.RefreshToken;
import com.zerohip.server.security.auth.repository.RefreshTokenRepository;
import com.zerohip.server.security.provider.JwtTokenizer;
import com.zerohip.server.security.utils.CustomAuthorityUtils;
import com.zerohip.server.user.entity.User;
import com.zerohip.server.user.repository.UserRepository;
import com.zerohip.server.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.*;

@RequiredArgsConstructor
@Slf4j
@Component
public class OAuth2UserSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final UserService userService;
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;



    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        var oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
        String loginId = email.substring(0, email.indexOf("@"));
        String password = randomPassword();
        String nickname = randomNickname();
        String provider = String.valueOf(oAuth2User.getAttributes().get("provider"));
        List<String> authorities = authorityUtils.createRoles(loginId);

        if (userRepository.findUserByEmail(email).isEmpty() && userRepository.findUserByLoginId(loginId).isEmpty()) {
            saveUser(email, loginId, password, nickname, provider);
        }

        redirect(request, response, loginId, authorities);

    }

    private void saveUser(String email, String loginId, String password, String nickname, String provider) {

        User user = new User(email, loginId, password, nickname, provider);
        userService.createUser(user);
    }




    private String delegateAccessToken(String loginId, List<String> authorities) {

        Map<String, Object> claims = new HashMap<>();
        claims.put("loginId", loginId);
        claims.put("roles", authorities);

        String subject = loginId;

        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }


    private String delegateRefreshToken(String loginId) {

        String subject = loginId;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        refreshTokenRepository.findByLoginId(loginId)
                .ifPresentOrElse(
                        re -> {
                            re.changeToken(refreshToken);
                            refreshTokenRepository.save(re);
                            log.info("# IssueRefreshToken | change token"); // 이미 생성된 토큰이 존재할 경우, 토큰 재발행 후 저장
                        },
                        () -> {
                            RefreshToken token = RefreshToken.createToken(loginId, refreshToken); // 없다면 토큰 생성 후, 저장
                            refreshTokenRepository.save(token);
                            log.info("# IssueRefreshToken | save login : {}, token : {}", token.getLoginId(), token.getToken());
                        });

        return refreshToken;
    }


    // 클라이언트에게 jwt 토큰 전송
    private void redirect(HttpServletRequest request, HttpServletResponse response, String loginId,
                          List<String> authorities) throws IOException {

        String accessToken = delegateAccessToken(loginId, authorities);
        String refreshToken = delegateRefreshToken(loginId);

        String uri = createURI(accessToken, refreshToken).toString();
        getRedirectStrategy().sendRedirect(request, response, uri);
    }



    // 랜덤으로 닉네임 생성
    private String randomNickname() {
        String randomNickname = UUID.randomUUID().toString().replaceAll("-", "");
        int length = Math.min(10, Math.max(4, randomNickname.length()));
        return randomNickname.substring(0, length);
    }

    private String randomPassword() {
        String randomPassword = UUID.randomUUID().toString().replaceAll("-", "");
        int length = Math.min(16, Math.max(8, randomPassword.length()));
        return randomPassword.substring(0, length);
    }


    // jwt 토큰 생성 후 클라이언트에게 Redirect . test 후 https 변경 예정
    private URI createURI(String accessToken, String refreshToken) {

        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken);
        queryParams.add("refresh_token", refreshToken);

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
//                .scheme("https")
                .host("localhost")
//                .host("zerohip.co.kr")
//                .path()
                .port(3000)
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}

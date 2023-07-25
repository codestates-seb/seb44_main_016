package com.zerohip.server.security.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zerohip.server.security.auth.NeverLandUserDetailsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
public class UserAuthenticationSuccessHandler implements AuthenticationSuccessHandler {


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        /**
         * 로그인 성공 시, loginId 와 nickname Response
         *  UserService, UserRepository 등 DI 주입 시, SecurityConfig 에서 의존성 문제 발생
         *  UserDetails -> NeverLandUserDetailsService 로 다운 캐스팅하여 가져옴
         */
        NeverLandUserDetailsService.NeverLandUserDetails userDetails = (NeverLandUserDetailsService.NeverLandUserDetails) authentication.getPrincipal();
        Long userId = userDetails.getUserId();
        String loginId = userDetails.getLoginId();
        String nickname = userDetails.getNickname();
        String profileImgPath = userDetails.getProfileImgPath();



        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("userId", userId);
        userInfo.put("loginId", loginId);
        userInfo.put("nickname", nickname);
        userInfo.put("profileImgPath", profileImgPath);

        String jsonResponse = new ObjectMapper().writeValueAsString(userInfo);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(jsonResponse);

        log.info("# Authenticated successfully!, 인증 성공!");
    }
}

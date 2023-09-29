package com.zerohip.server.security.oauth2.service;

import com.zerohip.server.security.oauth2.provider.OAuth2Attribute;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;

// OAuth2 인증 이후에 인증된 사용자 정보를 처리하는 사용자 서비스

@Slf4j
@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    // 액세스 토큰 -> 사용자 정보 요청 -> 처리
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> oAuth2UserService = new DefaultOAuth2UserService();

        OAuth2User oAuth2User = oAuth2UserService.loadUser(userRequest); // OAuth2 사용자 정보

        // userRequest를 통해 사용자의 정보 추출
        String registrationId = userRequest.getClientRegistration().getRegistrationId(); // OAuth2 이름( : google, naver, kakao)

        String userNameAttributeName = userRequest.getClientRegistration() // 각각의 Oauth2 키 값 ex) sub(google), id(kakao), id(naver)
                .getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

        OAuth2Attribute oAuth2Attribute =
                OAuth2Attribute.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());

        var userAttribute = oAuth2Attribute.convertToMap();

        log.info("provider = {}", userAttribute.get("provider")); // OAuth2 명
        System.out.println("provider :" + userAttribute.get("provider"));

        // Spring Seucirty의 OAuth2User 구현체 생성하여 반환(OAuth2UserSuccessHandler 사용)
        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")), // 사용자 권한 (ROLE_USER 만 사용중)
                userAttribute, // OAuth2 공급자로부터 받은 사용자 정보를 담고 잇는 Map 객체
                "id" // 사용자의 식별자를 나타내는 속성 key값
        );
    }
}
package com.zerohip.server.security.oauth2.provider;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.Map;

/**
 * 인증에 성공 후 받은 사용자 정보 매핑
 * 각각의 registrationId에 따라 attributes의 정보들을 다르게 추출
  */

@Slf4j
@ToString
@Builder(access = AccessLevel.PRIVATE)
@Getter
public class OAuth2Attribute {

    private Map<String, Object> attributes;
    private String attributeKey;
    private String provider;
    private String email;

    public static OAuth2Attribute of(String provider, String attributeKey,
                                     Map<String, Object> attributes) {
        switch (provider) {
            case "google":
                return ofGoogle(attributeKey, attributes);
            case "kakao":
                return ofKakao(attributeKey, attributes);
            case "naver":
                return ofNaver(attributeKey, attributes);
            default:
                System.out.println("구글, 카카오, 네이버 Oauth2 만 인증 가능");
                return null;
        }
    }


    // Oauth2를 통한 사용자 정보 설정을 위한 OAuthAttributes 생성자
    private static OAuth2Attribute ofGoogle(String attributeKey,
                                            Map<String, Object> attributes) {
        return OAuth2Attribute.builder()
                .email((String) attributes.get("email"))
                .attributes(attributes)
                .attributeKey((String) attributes.get(attributeKey))
                .provider("google")
                .build();
    }


    private static OAuth2Attribute ofKakao(String attributeKey,
                                           Map<String, Object> attributes) {

        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");

        return OAuth2Attribute.builder()
                .email((String) kakaoAccount.get("email"))
                .attributes(kakaoAccount)
                .attributeKey(String.valueOf(attributes.get(attributeKey)))
                .provider("kakao")
                .build();
    }

    private static OAuth2Attribute ofNaver(String attributeKey,
                                           Map<String, Object> attributes) {

        Map<String, Object> naverResponse = (Map<String, Object>) attributes.get("response");

        System.out.println("naverResponse = " + naverResponse);

        return OAuth2Attribute.builder()
                .email((String) naverResponse.get("email"))
                .attributes(naverResponse)
                .attributeKey(String.valueOf(attributes.get(attributeKey)))
                .provider("naver")
                .build();
    }



    // 사용되는 user entity의 객체 생성
    public Map<String, Object> convertToMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("id", attributeKey);
        map.put("provider", provider);
        map.put("email", email);

        return map;
    }
}

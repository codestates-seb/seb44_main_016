package com.zerohip.server.security.utils;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CustomAuthorityUtils {

//    @Value("${mail.address.admin}")
//    private String adminMailAddress;


    private final List<GrantedAuthority> ADMIN_ROLES = AuthorityUtils.createAuthorityList("ROLE_ADMIN", "ROLE_USER");
    private final List<GrantedAuthority> USER_ROLES = AuthorityUtils.createAuthorityList("ROLE_USER");

    private final List<String> ADMIN_ROLES_STRING = List.of("ADMIN", "USER");
    private final List<String> USER_ROLES_STRING = List.of("USER");


    // DB에 저장된 Role 기반으로 권한 정보 생성 (NeverLandUserDetailsService 의 1-3 번 참고)
    public List<GrantedAuthority> createAuthorities(List<String> roles) {

        List<GrantedAuthority> authorities = roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toList());

        return authorities;
    }


    // db 저장 : admin 계정 미도입으로 user role 만 저장
    public List<String> createRoles(String loginId) {

        return USER_ROLES_STRING;
    }
}

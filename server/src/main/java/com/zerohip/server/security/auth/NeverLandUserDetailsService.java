package com.zerohip.server.security.auth;


import com.zerohip.server.common.exception.BusinessLogicException;
import com.zerohip.server.common.exception.ExceptionCode;
import com.zerohip.server.security.utils.CustomAuthorityUtils;
import com.zerohip.server.user.entity.User;
import com.zerohip.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NeverLandUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final CustomAuthorityUtils authorityUtils;


    // 1. 권한 부여를 위해 loginId 로 유저 정보 (권한 포함) 불러옴
    @Override
    public UserDetails loadUserByUsername(String loginId) throws UsernameNotFoundException {

        Optional<User> optionalUser = userRepository.findUserByLoginId(loginId);
        User findUser = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        return new NeverLandUserDetails(findUser);
    }


    public final class NeverLandUserDetails extends User implements UserDetails {

        NeverLandUserDetails(User user) {
            setUserId(user.getUserId());
            setEmail(user.getEmail());
            setLoginId(user.getLoginId());
            setPassword(user.getPassword());
            setNickname(user.getNickname());
            setProfileImgPath(user.getProfileImgPath());
            setRoles(user.getRoles());  // 2. loadUserByUsername 메서드로 찾은 유저에게 권한 정보 전달
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {

            // 3. setRoles() 로 전달된 유저의 권한 정보를 db 테이블에서 불러온 후 생성
            return authorityUtils.createAuthorities(this.getRoles());
        }

        @Override
        public String getUsername() {
            return getLoginId();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        // retrun 값이 false 면, 첫 로그인 시도 시 UserAuthenticationFailureHandler 타고,
        // "401 Unauthorized, 사용자 계정이 잠겨있습니다" 에러 발생
        @Override
        public boolean isEnabled() {
            return true;
        }

    }
}

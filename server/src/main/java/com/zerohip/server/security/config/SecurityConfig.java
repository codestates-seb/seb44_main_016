package com.zerohip.server.security.config;


import com.zerohip.server.security.filter.JwtAuthenticationFilter;
import com.zerohip.server.security.filter.JwtVerificationFilter;
import com.zerohip.server.security.handler.UserAccessDeniedHandler;
import com.zerohip.server.security.handler.UserAuthenticationEntryPoint;
import com.zerohip.server.security.handler.UserAuthenticationFailureHandler;
import com.zerohip.server.security.handler.UserAuthenticationSuccessHandler;
import com.zerohip.server.security.provider.JwtTokenizer;
import com.zerohip.server.security.utils.CustomAuthorityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.filter.CorsFilter;

/**
 * JWT 를 Authorization header 에 포함되지 않고 요청을 보낸 경우 403 에러
 * 유효하지 않은 JWT를 Authorization header 에 담아 보낼 경우 403 에러 -> 검증 실패이므로 401 로 예외 처리
 */

@Configuration
@RequiredArgsConstructor
@Slf4j
@EnableWebSecurity
public class SecurityConfig {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final CorsFilter corsFilter;


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .headers().frameOptions().sameOrigin().disable() // 주의
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new UserAuthenticationEntryPoint())
                .accessDeniedHandler(new UserAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfig()) // 커스터마이징 된 CustomFilterConfigurer 추가
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .anyRequest().permitAll()   // role : user 만 있기 때문에 세부 권한 지정 필요 x
                );

        return http.build();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }



    // CustomFilterConfigurer 등록
    public class CustomFilterConfig extends AbstractHttpConfigurer<CustomFilterConfig, HttpSecurity> {

        @Override
        public void configure(HttpSecurity builder) throws Exception {

            // AuthenticationManager 객체를 가져오는데, Spring Security 설정을 구성하는 SecurityConfigurer 간에 공유되는 객체를 가져옴
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/user/login");   // 로그인 url 지정
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new UserAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new UserAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

            builder // 시큐리티 필터에 추가 (필터 순서에 유의)
                    .addFilter(corsFilter)  // SecurityCorsConfig 클래스에 설정한 cors 정책 추가
                    .addFilter(jwtAuthenticationFilter) // Spring Security Filter Chain 에 추가

                    // 로그인 인증에 성공한 후 발급받은 JWT가 클라이언트의 request header(Authorization 헤더)에 포함되어 있을 경우에만 동작
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }
}
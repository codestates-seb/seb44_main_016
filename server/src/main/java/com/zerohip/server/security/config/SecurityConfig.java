package com.zerohip.server.security.config;


import com.zerohip.server.security.auth.repository.RefreshTokenRepository;
import com.zerohip.server.security.filter.JwtAuthenticationFilter;
import com.zerohip.server.security.filter.JwtVerificationFilter;
import com.zerohip.server.security.handler.UserAccessDeniedHandler;
import com.zerohip.server.security.handler.UserAuthenticationEntryPoint;
import com.zerohip.server.security.handler.UserAuthenticationFailureHandler;
import com.zerohip.server.security.handler.UserAuthenticationSuccessHandler;
import com.zerohip.server.security.oauth2.handler.OAuth2UserSuccessHandler;
import com.zerohip.server.security.provider.JwtTokenizer;
import com.zerohip.server.security.utils.CustomAuthorityUtils;
import com.zerohip.server.user.repository.UserRepository;
import com.zerohip.server.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;


import static org.springframework.security.config.Customizer.withDefaults;


/**
 * JWT 를 Authorization header 에 포함되지 않고 요청을 보낸 경우 403 에러
 * 유효하지 않은 JWT를 Authorization header 에 담아 보낼 경우 403 에러 -> 검증 실패이므로 401 로 예외 처리
 */

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserService userService;
    private final UserRepository userRepository;


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .headers().frameOptions().disable()
                .and()
                .cors(withDefaults())
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new UserAuthenticationEntryPoint())
                .accessDeniedHandler(new UserAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfig())
                .and()
                .authorizeRequests(authorize -> authorize
                        .anyRequest().permitAll())
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(new OAuth2UserSuccessHandler(jwtTokenizer, authorityUtils, userService, userRepository, refreshTokenRepository)));

        return http.build();
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowCredentials(true);
        configuration.addAllowedOriginPattern("http://localhost:3000");
        configuration.addAllowedOriginPattern("http://localhost:5173");
        configuration.addAllowedOriginPattern("https://zerohip.co.kr");
        configuration.addAllowedOriginPattern("https://www.zerohip.co.kr");
        configuration.addAllowedOriginPattern("https://api.zerohip.co.kr");
        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedMethod("*");
        configuration.addExposedHeader("Authorization");
        configuration.addExposedHeader("Refresh");
        configuration.addAllowedHeader("*");

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }


    // CustomFilterConfigurer 등록
    public class CustomFilterConfig extends AbstractHttpConfigurer<CustomFilterConfig, HttpSecurity> {

        @Override
        public void configure(HttpSecurity builder) throws Exception {

            // AuthenticationManager 객체를 가져오는데, Spring Security 설정을 구성하는 SecurityConfigurer 간에 공유되는 객체를 가져옴
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer, refreshTokenRepository);
            jwtAuthenticationFilter.setFilterProcessesUrl("/user/login");   // 로그인 url 지정
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new UserAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new UserAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

            builder // 시큐리티 필터에 추가 (필터 순서에 유의)
//                    .addFilter(corsFilter)              // SecurityCorsConfig 클래스에 설정한 cors 정책 추가
                    .addFilter(jwtAuthenticationFilter) // Spring Security Filter Chain 에 추가

                    // 로그인 인증에 성공한 후 발급받은 JWT가 클라이언트의 request header(Authorization 헤더)에 포함되어 있을 경우에만 동작
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class)
                    .addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class);
        }
    }






//    @Bean
//    public ClientRegistrationRepository clientRegistrationRepository(OAuth2ClientProperties oAuth2ClientProperties) {
//        List<ClientRegistration> registrations = oAuth2ClientProperties
//                .getRegistration().keySet().stream()
//                .map(client -> getRegistration(oAuth2ClientProperties, client))
//                .filter(Objects::nonNull)
//                .collect(Collectors.toList());
//
//        return new InMemoryClientRegistrationRepository(registrations);
//    }
//
//    private ClientRegistration getRegistration(OAuth2ClientProperties clientProperties, String client) {
//
//        if ("google".equals(client)) {
//            OAuth2ClientProperties.Registration registration = clientProperties.getRegistration().get("google");
//
//            return CommonOAuth2Provider
//                    .GOOGLE
//                    .getBuilder(client)
//                    .clientId(registration.getClientId())
//                    .clientSecret(registration.getClientSecret())
//                    .scope("email", "profile")
//                    .build();
//        }
//        return null; // 구글 client 못 찾을 경우
//    }
}
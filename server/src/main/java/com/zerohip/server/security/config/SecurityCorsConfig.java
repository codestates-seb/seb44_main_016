package com.zerohip.server.security.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityCorsConfig {

    @Bean
    public CorsFilter corsFilter() {

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true);
        configuration.addAllowedOriginPattern("http://localhost:3000");
        configuration.addAllowedOriginPattern("http://localhost:5173");
        configuration.addAllowedOriginPattern("https://zerohip.co.kr");
        configuration.addAllowedOriginPattern("https://www.zerohip.co.kr");
        configuration.addAllowedOriginPattern("http://3.39.235.244:8080/h2");
        configuration.addAllowedMethod("*");
        configuration.addExposedHeader("Authorization");  // 응답 헤더 노출
        configuration.addExposedHeader("Refresh");  //
        configuration.addAllowedHeader("*");    // 클라이언트가 서버에 요청을 보낼 때, 헤더에 토큰 등을 담아 요청하는걸 허용

        source.registerCorsConfiguration("/**", configuration);

        return new CorsFilter(source);
    }
}

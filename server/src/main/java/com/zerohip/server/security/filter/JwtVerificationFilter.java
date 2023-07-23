package com.zerohip.server.security.filter;

import com.zerohip.server.security.provider.JwtTokenizer;
import com.zerohip.server.security.utils.CustomAuthorityUtils;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * 클라이언트 측에서 JWT를 이용해 자격 증명이 필요한 리소스에 대한 request 전송 시,
 * request header를 통해 전달받은 JWT를 서버 측에서 검증하는 기능.
 *
 * -> 컨트롤러 단에서 @AuthenticationPrincipal 로 검증된 사용자 정보 주입받아 사용
 */

// OncePerRequestFilter : request 당 한 번만 실행되는 Security Filter
@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;


    /** 예외를 try catch 문, shouldNotFilter() 로 처리하는 이유
     *  SecurityContext에 클라이언트의 인증 정보가 채워지지 않은 상태에서 Security Filter 로직을 수행하게 되면,
     *  Security Filter 체인의 Filter 내부에서 AuthenticationException 발생하게 되고,
     *  발생한 예외를 UserAuthenticationEntryPoint 클래스로 처리
     *
     *
     * 1. 예외가 발생하면 인증정보가 시큐리티 컨텍스트에 저장되지않고, shouldNotFilter 로 계속해서 스킵 후 이동
     * 2. Filter 내부에서 AuthenticationException 발생
     * 3. AuthenticationEntryPoint 에서 처리
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        try {
            Map<String, Object> claims = verifyJws(request);
            setAuthenticationToContext(claims);
        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }
        filterChain.doFilter(request, response);    // (Next) Security Filter 호출
    }


    // 일종의 예외 처리 (유효한 토큰 정보가 없으면 skip 후 다음 필터로 이동)
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {

        String authorization = request.getHeader("Authorization");

        return authorization == null || !authorization.startsWith("Bearer");
    }


    // 1. JWT 검증
    private Map<String, Object> verifyJws(HttpServletRequest request) {

        String jws = request.getHeader("Authorization").replace("Bearer ",""); // Bearer 제거
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey()); // jwt 서명 검증을 위한 시크릿 키
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody(); // 파싱 성공 = 서명 검증 성공

        System.out.println(claims); // 테스트 후 삭제 예정

        return claims;
    }


    // 2. Authentication 객체를 SecurityContext 에 저장
    private void setAuthenticationToContext(Map<String, Object> claims) {

        String loginId = (String) claims.get("loginId");
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List) claims.get("roles"));
//        List<String> roles = new ArrayList<>();
//        authorities.forEach(u -> roles.add(u.getAuthority()));
//        User user = User.builder()
//                .loginId(loginId)
//                .roles(roles).build();

        Authentication authentication = new UsernamePasswordAuthenticationToken(loginId, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}

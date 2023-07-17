package com.zerohip.server.security.provider;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zerohip.server.security.auth.NeverLandUserDetailsService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.security.auth.Subject;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtTokenizer {

    private final NeverLandUserDetailsService userDetailsService;

    // application.yml 파일에서 로드할 JWT 정보
    @Getter
    @Value("${jwt.key}")
    private String secretKey;

    @Getter
    @Value("${jwt.access-token-expiration-minutes}")
    private int accessTokenExpirationMinutes;

    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes;


    /**
     * secretKey -> TF_8 ->  base64 형시으로 인코딩
     *  : 일반 텍스트 형태를 비밀 키로 사용할 때는 특정 길이의 바이트 배열 사용하는데,
     *    문자열은 가변길이기 때문에 길이조정을 위해 ASCII 문자 집합으로 이루어진 base64로 인코딩하여 텍스트 형태로 안전하게 다루기 위함
     */
    public String encodeBase64SecretKey(String secretKey) {

        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    // : Access Token 생성
    public String generateAccessToken(Map<String, Object> claims,   // 키 : 클레임 이름(식별자id 등), 값 : 클레임의 값 자체
                                      String subject,
                                      Date expiration,
                                      String base64EncodedSecretKey) {

        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.builder()
                .setClaims(claims)          // : 인증된 사용자 정보
                .setSubject(subject)        // : jwt 제목
                .setIssuedAt(Calendar.getInstance().getTime())   // : jwt 발행 일자
                .setExpiration(expiration)  // : jwt 만료 일시
                .signWith(key)              // : 서명을 위한 key 객체
                .compact();                 // : jwt 생성 및 직렬화
    }

    // : Refresh Token 생성
    public String generateRefreshToken(String subject, Date expiration, String base64EncodedSecretKey) {

        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.builder() // : 사용자 정보 필요x
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }


    // 토큰 검증 필터에서 사용 : 토큰 검증 후 해독 -> claims 요소들 반환 (일종의 디코딩)
    public Jws<Claims> getClaims(String jws, String base64EncodedSecretKey){

        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(key) // 암호화된 시크릿키
                .build() // 디코딩
                .parseClaimsJws(jws);   // 클레임으로 반환
        return claims;
    }



    // 토큰의 만료시간 지정 후 Date 객체로 반환
    public Date getTokenExpiration(int expirationMinutes) {

        Calendar calendar = Calendar.getInstance(); // getInstance() : 인스턴스 생성 후 현재 시스템의 날짜/시간 으로 초기화
        calendar.add(Calendar.MINUTE, expirationMinutes);   // 현재시간의 minute + expirationMinutes
        Date expiration = calendar.getTime();

        return expiration;
    }



    // : jwt 서명에 사용할 key 생성
    public Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey) {

        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);  // :  디코딩 후 byte array 반환
        Key key = Keys.hmacShaKeyFor(keyBytes);    // : 최신화된 hmac 알기로즘 지정 후 반환

        return key;
    }


    // Jwt 토큰 검증 후 status 값 반환
    public JwtStatus validateToken(String token) {

        String base64EncodedSecretKey = encodeBase64SecretKey(secretKey);
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return JwtStatus.ACCESS;
        } catch (ExpiredJwtException e) {
            return JwtStatus.EXPIRED;
        } catch (JwtException | IllegalStateException e) {
            log.info("# jwtException: {}", e);
        }
        return JwtStatus.DENIED;
    }

    // refresh 토큰 검증 -> 인증된 사용자 정보 반환
    public Authentication getAuthentication(String token) {

        String base64EncodedSecretKey = encodeBase64SecretKey(secretKey);
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        UserDetails userDetails = userDetailsService.loadUserByUsername(claims.getSubject());

        return new UsernamePasswordAuthenticationToken(userDetails, token, userDetails.getAuthorities());
    }

}
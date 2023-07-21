package com.zerohip.server.security.auth.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tokenId;

    @Column(nullable = false, unique = true)
    private String loginId;

    @Column(nullable = false)
    private String token;

    private RefreshToken(String loginId, String token) {
        this.loginId = loginId;
        this.token = token;
    }

    public static RefreshToken createToken(String loginId, String token) {
        return new RefreshToken(loginId, token);
    }

    public void changeToken(String token) {
        this.token = token;
    }
}

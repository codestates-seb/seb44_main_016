package com.zerohip.server.user.entity;

import com.zerohip.server.common.audit.Auditable;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "USERS")
public class User extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, unique = true, updatable = false)
    private String email;

    @Column(nullable = false, unique = true, updatable = false)
    private String loginId;

    @Column(nullable = false, length = 150)
    private String password;

    @Column
    private String nickname;

    @Column
    private String provider;

    public User(String email, String loginId, String password, String nickname, String provider) {
        this.email = email;
        this.loginId = loginId;
        this.password = password;
        this.nickname = nickname;
        this.provider = provider;
    }

    @Builder.Default
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();


    /** 연관관계 매핑
     *  userImage
     *  faRec
     *  aRecBoard
     *  friend
     *  article
     */
}

package com.zerohip.server.user.entity;

import com.zerohip.server.common.audit.Auditable;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Data
@AllArgsConstructor
@Builder
@Entity
@Table(name = "USERS")
@MappedSuperclass
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

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

  public User(User user) {
    this.userId = user.userId;
    this.email = user.email;
    this.loginId = user.loginId;
    this.password = user.password;
    this.nickname = user.nickname;
    this.roles = user.roles;
  }


  /** 연관관계 매핑
     *  userImage
     *  faRec
     *  aRecBoard
     *  friend
     *  article
     */
}

package com.zerohip.server.user.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.zerohip.server.common.audit.Auditable;
import com.zerohip.server.feedArticle.entity.FeedArticle;
import com.zerohip.server.financialRecord.entity.FinancialRecord;
import com.zerohip.server.financialRecordArticle.entity.FinancialRecordArticle;
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
@JsonInclude(JsonInclude.Include.NON_NULL)  // test 후 기능 완료되면 삭제 예정 (mypage 조회용)
public class User extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, unique = true, updatable = false)
    private String email;

    @Column(nullable = false, unique = true, updatable = false)
    private String loginId;

    @Column(length = 150)
    private String password;

    @Column
    private String nickname;

    @Column
    private Provider provider;

    // 테스트 중
    @Column
    private Boolean followed;

    // 테스트 중
    public User(Long userId, String loginId, String nickname) {
        this.userId = userId;
        this.loginId = loginId;
        this.nickname = nickname;
    }

    // 테스트 중
    public User(Long userId, String loginId, String nickname, Boolean followed) {
        this.userId = userId;
        this.loginId = loginId;
        this.nickname = nickname;
        this.followed = followed;
    }

    public User(String email, String loginId, String password, String nickname, String provider) {
        this.email = email;
        this.loginId = loginId;
        this.password = password;
        this.nickname = nickname;

        switch (provider) {
            case "google":
                this.provider = Provider.GOOGLE;
                break;
            case "naver":
                this.provider = Provider.NAVER;
                break;
            case "kakao":
                this.provider = Provider.KAKAO;
                break;
            default:
                this.provider = null;
        }
    }

    @Getter
    public enum Provider {
        GOOGLE, NAVER, KAKAO;
    }

    @Builder.Default
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();


    // 트랜잭션 전략 설정 필요
    @OneToMany(mappedBy = "user")
    private List<FeedArticle> feedArticles = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<FinancialRecord> financialRecords = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<FinancialRecordArticle> financialRecordArticles = new ArrayList<>();

    /** 연관관계 매핑
     *  userImage

     *  friend

     */
}

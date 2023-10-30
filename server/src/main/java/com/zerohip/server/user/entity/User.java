package com.zerohip.server.user.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.zerohip.server.common.audit.Auditable;
import com.zerohip.server.feedArticle.entity.FeedArticle;
import com.zerohip.server.financialRecord.entity.FinancialRecord;
import com.zerohip.server.financialRecordArticle.entity.FinancialRecordArticle;
import com.zerohip.server.follow.entity.Follow;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.Min;
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

    @Column(length = 150)
    private String password;

    @Column
    private String nickname;

    @Column
    private Provider provider;

    // 프로필 url 추가
    @Column
    private String profileImgPath;

    @Column
    private int followerCount;

    @Column
    private int followingCount;

//    @Min(1)
//    @Column(nullable = false, unique = false, updatable = false, columnDefinition = "integer default 1")
//    private int randomAvatarNum;


    @Builder.Default
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();


    @OneToMany(mappedBy = "followerId", cascade = CascadeType.REMOVE)   // 회원 탈퇴 시 리스트 삭제
    private List<Follow> followerList = new ArrayList<>();

    @OneToMany(mappedBy = "followingId", cascade = CascadeType.REMOVE)   // 회원 탈퇴 시 리스트 삭제
    private List<Follow> followingList = new ArrayList<>();


    // 트랜잭션 전략 설정 필요
    @OneToMany(mappedBy = "user")
    private List<FeedArticle> feedArticles = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<FinancialRecord> financialRecords = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<FinancialRecordArticle> financialRecordArticles = new ArrayList<>();


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
}

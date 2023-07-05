package com.zerohip.server.feedArticle.entity;

import com.zerohip.server.common.audit.Auditable;
import com.zerohip.server.common.feedType.FeedType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "feedArticles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FeedArticle extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedArticleId;

    //feedType - 절약팁, 허락해줘 선택
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FeedType feedType;

    //본문(최대 글자 수에 대해 아직 정해진 내용이 없음)
    @Column(nullable = false)
    private String content;

    //피드게시글 작성시간
    private LocalDateTime createdAt;

    //이미지 파일
    /*
    @OneToMany(mappedBy = "feedArticle", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FeedArticleImage> images = new ArrayList<>();
     */

    //해시태그, 댓글, 유저, 투표(절약/플렉스) 추가적으로 작성 필요
}

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

    //@Size -> 본문 문자열 크기 정하고 나서 사용
    @Column(nullable = false)
    private String content;

    //피드게시글 작성시간은 Auditable 상속받기 때문에 아예 필드변수 없어도 ok.

    //이미지 파일
    /*
    @OneToMany(mappedBy = "feedArticle", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FeedArticleImg> images = new ArrayList<>();
     */

    //해시태그, 댓글, 유저, 투표(절약/플렉스) 추가적으로 작성 필요
}
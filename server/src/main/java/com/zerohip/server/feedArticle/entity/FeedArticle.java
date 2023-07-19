package com.zerohip.server.feedArticle.entity;

import com.zerohip.server.common.article.Article;
import com.zerohip.server.common.feedType.FeedType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "feedArticles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FeedArticle extends Article {

    //feedType - 절약팁, 허락해줘 선택
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FeedType feedType;

    @Size(max = 2_000)
    @NotNull
    @Column(nullable = false, length = 2_000)
    private String content;

    //이미지 파일
    /*
    @OneToMany(mappedBy = "feedArticle", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FeedArticleImg> images = new ArrayList<>();
     */
    // 투표 횟수
    @Column(nullable = false)
    private int voteCount = 0;

    // 투표 횟수 증가 메서드
    public void increaseVoteCount() {
        this.voteCount++;
    }

    // 투표 횟수 감소 메서드
    public void decreaseVoteCount() {
        this.voteCount--;
    }

    // 댓글, 유저, 투표(절약/플렉스) 추가적으로 작성 필요
}

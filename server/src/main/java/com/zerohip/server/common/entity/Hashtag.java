package com.zerohip.server.common.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.zerohip.server.feedArticle.entity.FeedArticle;
import com.zerohip.server.feedArticle.service.FeedArticleService;
import com.zerohip.server.financialRecordArticle.entity.FinancialRecordArticle;
import lombok.*;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "hashtags")
public class Hashtag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hashtagId;

    @Column(unique = true, nullable = false)
    private String hashtag;

    //피드게시글
    @OneToMany(mappedBy = "hashtag")
    @LazyCollection(LazyCollectionOption.EXTRA)
    private Set<FeedArticle> feedArticles = new HashSet<>();

    //가계부게시글
    @OneToMany(mappedBy = "hashtag")
    @LazyCollection(LazyCollectionOption.EXTRA)
    private Set<FinancialRecordArticle> faRecArticleSet = new HashSet<>();

    @Builder
    public Hashtag(Long hashtagId, String hashtag) {
        this.hashtagId = hashtagId;
        this.hashtag = hashtag;
    }
}
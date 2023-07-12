package com.zerohip.server.common.img.entity;

import com.zerohip.server.common.article.Article;
import com.zerohip.server.feedArticle.entity.FeedArticle;
import com.zerohip.server.financialRecordArticle.entity.FinancialRecordArticle;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Size;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Img {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Size(max = 50)
  @Column(nullable = true, length = 50)
  private String fileName;
  @Size(max = 100)
  @Column(nullable = true, length = 100)
  private String filePath;

  // 매핑 고고
  @ManyToOne
  @JoinColumn(name = "fianancial-record-article-id")
  private FinancialRecordArticle financialRecordArticle;

  /*@ManyToOne
  @JoinColumn(name = "feed-article-id")
  private FeedArticle feedArticle;*/
}

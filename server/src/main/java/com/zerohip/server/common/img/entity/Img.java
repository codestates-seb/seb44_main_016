package com.zerohip.server.common.img.entity;


import com.zerohip.server.common.article.Article;
import com.zerohip.server.feedArticle.entity.FeedArticle;
import com.zerohip.server.financialRecordArticle.entity.FinancialRecordArticle;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Table(name = "imgs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Img {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Size(max = 2000)
  @Column(nullable = true, length = 2000)
  private String fileName;
  @Size(max = 3000)
  @Column(nullable = true, length = 3000)
  private String filePath;

  // 매핑 고고
  @ManyToOne
  @JoinColumn(name = "fianancial_record_article_id")
  private FinancialRecordArticle financialRecordArticle;

  @ManyToOne
  @JoinColumn(name = "feed_article_id")
  private FeedArticle feedArticle;

  public Img(String fileName, String filePath) {
    this.fileName = fileName;
    this.filePath = filePath;
  }
}

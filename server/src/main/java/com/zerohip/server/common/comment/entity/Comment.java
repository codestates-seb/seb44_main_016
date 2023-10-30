package com.zerohip.server.common.comment.entity;

import com.zerohip.server.common.audit.Auditable;
import com.zerohip.server.feedArticle.entity.FeedArticle;
import com.zerohip.server.financialRecordArticle.entity.FinancialRecordArticle;
import com.zerohip.server.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "comments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Comment extends Auditable {
  @Id
  @GeneratedValue(strategy = IDENTITY)
  private Long commentId;

  @Size(max = 2_000)
  @NotBlank
  @Column(nullable = false, unique = false, updatable = true, length = 2_000)
  private String content;

  @ManyToOne
  @JoinColumn(name = "fianancial-record-article-id")
  private FinancialRecordArticle financialRecordArticle;

  @ManyToOne
  @JoinColumn(name = "feed-article-id")
  private FeedArticle feedArticle;

  @ManyToOne
  @JoinColumn(name = "user-id")
  private User user;
  /**
   * - 좋아요
   */
}

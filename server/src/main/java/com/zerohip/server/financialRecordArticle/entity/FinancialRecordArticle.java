package com.zerohip.server.financialRecordArticle.entity;

import com.zerohip.server.common.scope.Scope;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

/**
 * faDate를 어떻게 저장할 것인가..!
 * Date!? String!?
 * - String으로 저장하면, 조회할 때, String을 Date로 변환해야 한다.
 */
@NoArgsConstructor
@Setter
@Getter
@Entity
public class FinancialRecordArticle {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long financialRecordArticleId;

  @Size(max = 30)
  @Column(nullable = true, unique = false, updatable = true, length = 30)
  private String title;
  @Size(max = 10000)
  @Column(nullable = true, unique = false, updatable = true, length = 10000)
  private String content;
  @NotNull
  @Column(nullable = false, unique = false, updatable = true)
  private Date faDate;
  @NotBlank
  @Size(min = 1, max = 10)
  @Column(nullable = false, unique = false, updatable = true, length = 10)
  private String category;

  /**
   * 글의 공개 범위
   * - 가계부 게시글(FAREC_ARTICLE)
   * - 가계부 게시글(FAREC_TIMELINE)
   * - 피드(FEED)
   */
  @NotNull
  @Enumerated(EnumType.STRING)
  private Scope scope;

  // 가계부 매핑
  // 유저 매핑
  // 이미지 매핑
  // 댓글 매핑
  // 좋아요 매핑
  // 해시태그 매핑
}

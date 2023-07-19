package com.zerohip.server.common.article;


import com.zerohip.server.common.audit.Auditable;
import com.zerohip.server.common.scope.Scope;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import static javax.persistence.GenerationType.IDENTITY;

@NoArgsConstructor
@Getter
@Setter
@MappedSuperclass
public abstract class Article extends Auditable {

  @Id
  @GeneratedValue(strategy = IDENTITY)
  private Long id;

  private String content;

  /**
   * 글의 공개 범위
   * - 가계부 게시글(FAREC_ARTICLE)
   * - 가계부 게시글(FAREC_TIMELINE)
   * - 피드(FEED)
   */
  @NotNull
  @Column(nullable = false)
  @Enumerated(EnumType.STRING)
  private Scope scope;

  public Article(Scope scope) {
    super();
  }
}

package com.zerohip.server.common.comment.entity;

import com.zerohip.server.common.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import static javax.persistence.GenerationType.IDENTITY;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Comment extends Auditable {
  @Id
  @GeneratedValue(strategy = IDENTITY)
  private Long commentId;

  @Size(max = 2_000)
  @NotBlank
  @Column(nullable = false, unique = false, updatable = true, length = 2_000)
  private String content;

  /**
   * - 피드 게시물
   * - 가계부 게시물
   * - 좋아요
   * - 유저
   */
}

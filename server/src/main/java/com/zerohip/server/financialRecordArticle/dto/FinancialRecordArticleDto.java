package com.zerohip.server.financialRecordArticle.dto;

import com.zerohip.server.common.audit.Auditable;
import com.zerohip.server.common.scope.Scope;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.Date;

public class FinancialRecordArticleDto {

  @Getter
  @AllArgsConstructor
  public static class Post {
    @Size(max = 30)
    private String title;
    @Size(max = 10000)
    private String content;
    @NotNull
    private Date faDate;
    @NotBlank
    private String category;
    @NotNull
    private int price;
    @NotNull
    private Scope scope;

    // 가계부 매핑 데이터
    // 유저 매핑 데이터
    // 이미지 매핑 데이터
    // 댓글 매핑 데이터
    // 좋아요 매핑 데이터
    // 해시태그 매핑 데이터
  }

  @Getter
  @AllArgsConstructor
  public static class Patch {
    @Size(max = 30)
    private String title;
    @Size(max = 10000)
    private String content;
    @NotNull
    private Date faDate;
    @NotBlank
    @Size(min = 1, max = 10)
    private String category;
    @NotNull
    private int price;
    @NotNull
    private Scope scope;

    // 가계부 매핑 데이터
    // 유저 매핑 데이터
    // 이미지 매핑 데이터
    // 댓글 매핑 데이터
    // 좋아요 매핑 데이터
    // 해시태그 매핑 데이터
  }

  @Getter
  @AllArgsConstructor
  public static class Response {
    private Long financialRecordArticleId;
    @Size(max = 30)
    private String title;
    @Size(max = 10000)
    private String content;
    @NotNull
    private Date faDate;
    @NotBlank
    private String category;
    @NotNull
    private int price;
    @NotNull
    private Scope scope;

    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    // 가계부 매핑 데이터
    // 유저 매핑 데이터
    // 이미지 매핑 데이터
    // 댓글 매핑 데이터
    // 좋아요 매핑 데이터
    // 해시태그 매핑 데이터
  }
}

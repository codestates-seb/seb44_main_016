package com.zerohip.server.financialRecordArticle.dto;

/*import com.zerohip.server.common.img.dto.ImgDto;
import com.zerohip.server.common.img.entity.Img;*/
import com.zerohip.server.common.scope.Scope;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

public class FinancialRecordArticleDto {

  @Getter
  @AllArgsConstructor
  public static class Post {
    @Size(max = 30)
    private String title;
    @Size(max = 2000)
    private String content;
    @NotNull
    private LocalDate faDate;
    @NotBlank
    private String category;
    @NotNull
    private Integer price;
    @NotNull
    private Scope scope;
    // 가계부 매핑 데이터
    private Long financialRecordId;
/*    // 유저 매핑 데이터
    private Long userId;*/
    // 이미지 매핑 데이터
//    private List<ImgDto.Response> imgDtos;
    // 댓글 매핑 데이터
    // 좋아요 매핑 데이터
    // 해시태그 매핑 데이터
  }

  @Getter
  @AllArgsConstructor
  public static class Patch {
    @Size(max = 30)
    private String title;
    @Size(max = 2000)
    private String content;
    @NotNull
    private LocalDate faDate;
    @NotBlank
    @Size(min = 1, max = 10)
    private String category;
    @NotNull
    private Integer price;
    @NotNull
    private Scope scope;
    // 가계부 매핑 데이터
    // 이미지 매핑 데이터
    // 해시태그 매핑 데이터
  }

  @Getter
  @AllArgsConstructor
  public static class Response {
    private Long financialRecordArticleId;
    @Size(max = 30)
    private String title;
    @Size(max = 2000)
    private String content;
    @NotNull
    private LocalDate faDate;
    @NotBlank
    private String category;
    @NotNull
    private Integer price;
    @NotNull
    private Scope scope;

    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    // 가계부 매핑 데이터
    private Long financialRecordId;
/*    // 유저 매핑 데이터
    private Long userId;*/
    // 이미지 매핑 데이터
//    private List<ImgDto.Response> imgDtos;
    // 댓글 매핑 데이터
    // 좋아요 매핑 데이터
    // 해시태그 매핑 데이터
  }
}

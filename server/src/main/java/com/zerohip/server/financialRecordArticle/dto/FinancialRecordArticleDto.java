package com.zerohip.server.financialRecordArticle.dto;

import com.zerohip.server.common.img.dto.ImgDto;
import com.zerohip.server.common.scope.Scope;
import com.zerohip.server.user.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;

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
    @Size(min = 1, max = 10)
    private String category;
    @NotNull
    private Integer price;
    @NotNull
    private Scope scope;

    @NotNull
    private Long financialRecordId;
    private List<String> filePath;
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

    private List<MultipartFile> newFiles; // 새로 추가될 이미지들
    private List<String> deleteImgPaths; // 삭제될 이미지의 ID 리스트
    // 해시태그 매핑 데이터
  }

  @Getter
  @AllArgsConstructor
  public static class Response {
    private Long articleId;
    private String title;
    private String content;
    private LocalDate faDate;
    private String category;
    private Integer price;
    private Scope scope;

    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    private Long financialRecordId;
    private UserDto.Response user;
    private List<String> filePath;
    // 댓글 매핑 데이터
    // 좋아요 매핑 데이터
    // 해시태그 매핑 데이터


    public void setFinancialRecordId(Long financialRecordId) {
      this.financialRecordId = financialRecordId;
    }
    public void setFilePath(List<String> filePath) {
      this.filePath = filePath;
    }
  }
}

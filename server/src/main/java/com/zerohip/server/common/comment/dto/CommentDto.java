package com.zerohip.server.common.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

public class CommentDto {

  @Getter
  @AllArgsConstructor
  public static class Post {
    @Size(max = 2_000)
    @NotBlank
    private String content;
  }

  @Getter
  @AllArgsConstructor
  public static class Patch {
    @Size(max = 2_000)
    @NotBlank
    private String content;
  }

  @Getter
  @AllArgsConstructor
  public static class Response {
    private Long commentId;
    private String content;

    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
  }
}

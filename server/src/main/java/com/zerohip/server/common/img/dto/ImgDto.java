package com.zerohip.server.common.img.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.Size;

public class ImgDto {

  @Getter
  @AllArgsConstructor
  public static class Post {
    @Size(max = 2000)
    private String fileName;
    @Size(max = 3000)
    private String filePath;

    private Long financialRecordArticleId;
  }

  @Getter
  @AllArgsConstructor
  public static class Patch {
    @Size(max = 2000)
    private String fileName;
    @Size(max = 3000)
    private String filePath;
  }

  @Getter
  @AllArgsConstructor
  public static class Response {
    private Long id;
    @Size(max = 2000)
    private String fileName;
    @Size(max = 3000)
    private String filePath;

    private Long financialRecordArticleId;
  }
}



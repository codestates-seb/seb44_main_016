package com.zerohip.server.financialRecord.dto;

import com.zerohip.server.user.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;


public class FinancialRecordDto {

  @Getter
  @AllArgsConstructor
  public static class Post {
    @NotBlank
    @Size(min = 1, max = 30)
    private String financialRecordName;
    private String memo;
  }

  @Getter
  @AllArgsConstructor
  public static class Patch {
    @NotBlank
    @Size(min = 1, max = 30)
    private String financialRecordName;
    private String memo;
  }

  @Getter
  @AllArgsConstructor
  public static class Response {
    private Long financialRecordId;
    private String financialRecordName;
    private String memo;
    private int totalCount;
    private int timeLineCount;
    private boolean isBookmark;

    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    private UserDto.Response user;
  }
}
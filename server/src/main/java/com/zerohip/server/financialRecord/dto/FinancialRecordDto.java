package com.zerohip.server.financialRecord.dto;

import com.zerohip.server.common.audit.Auditable;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class FinancialRecordDto {

  @Getter
  @AllArgsConstructor
  public static class Post extends Auditable {
    @NotBlank
    @Size(min = 1, max = 30)
    @Column(nullable = false, unique = false, updatable = true)
    private String financialRecordName;

    // User
  }

  @Getter
  @AllArgsConstructor
  public static class Patch extends Auditable {
    @NotBlank
    @Size(min = 1, max = 30)
    @Column(nullable = false, unique = false, updatable = true)
    private String financialRecordName;

    // User
  }

  @Getter
  @AllArgsConstructor
  public static class Response extends Auditable {
    private Long financialRecordId;
    private String financialRecordName;

    // User
  }
}

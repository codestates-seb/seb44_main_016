package com.zerohip.server.financialRecord.entity;

import com.zerohip.server.common.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@NoArgsConstructor
@Setter
@Getter
@Entity
public class FinancialRecord extends Auditable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long financialRecordId;

  @NotBlank
  @Size(min = 1, max = 30)
  @Column(nullable = false, unique = false, updatable = true)
  private String financialRecordName;

  @Column(nullable = true, unique = false, updatable = true)
  private String memo;

  // 게시물 수
  // 타임라인수 -> 매핑 시 적용

  // 유저 매핑(List 형식)


  public FinancialRecord(String financialRecordName, String memo) {
    this.financialRecordName = financialRecordName;
    this.memo = memo;
  }
}

package com.zerohip.server.financialRecord.entity;

import com.zerohip.server.financialRecordArticle.entity.FinancialRecordArticle;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.LinkedList;
import java.util.List;

@NoArgsConstructor
@Setter
@Getter
@Entity
public class FinancialRecord {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long financialRecordId;

  @NotBlank
  @Size(min = 1, max = 30)
  @Column(nullable = false, unique = false, updatable = true)
  private String financialRecordName;

  @Column(nullable = true, unique = false, updatable = true)
  private String financialRecordDescription;

  // 가계부 내역 매핑(List 형식)
//  @OneToMany(mappedBy = "financialRecord", cascade = CascadeType.ALL)
//  private List<FinancialRecordArticle> articles = new LinkedList<>();

  // 유저 매핑(List 형식)


  public FinancialRecord(String financialRecordName) {
    this.financialRecordName = financialRecordName;
  }
}

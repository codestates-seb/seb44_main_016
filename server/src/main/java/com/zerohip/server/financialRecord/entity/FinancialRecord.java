package com.zerohip.server.financialRecord.entity;

import com.zerohip.server.common.audit.Auditable;
import com.zerohip.server.common.img.entity.Img;
import com.zerohip.server.financialRecordArticle.entity.FinancialRecordArticle;
import com.zerohip.server.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name = "financial_records")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
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

  @Min(0)
  @Column(nullable = false, unique = false, updatable = false, columnDefinition = "integer default 0")
  private int totalCount;

  @Min(0)
  @Column(nullable = false, unique = false, updatable = false, columnDefinition = "integer default 0")
  private int timeLineCount;

  @Column(columnDefinition = "boolean default false")
  private boolean isBookmark;

  // 게시물 수
  @OneToMany(mappedBy = "financialRecord", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<FinancialRecordArticle> financialRecordArticles; // 글 매핑(List 형식)

  // 유저 매핑(List 형식)
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @OneToOne(mappedBy = "financialRecord", cascade = CascadeType.ALL)
  private Img profileImg;

  public FinancialRecord(String financialRecordName, String memo) {
    this.financialRecordName = financialRecordName;
    this.memo = memo;
  }
}
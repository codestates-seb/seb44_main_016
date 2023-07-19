package com.zerohip.server.financialRecordArticle.entity;

import com.zerohip.server.common.article.Article;
//import com.zerohip.server.common.img.entity.Img;
import com.zerohip.server.common.scope.Scope;
import com.zerohip.server.financialRecord.entity.FinancialRecord;
import com.zerohip.server.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * faDate를 어떻게 저장할 것인가..!
 * Date!? String!?
 * - String으로 저장하면, 조회할 때, String을 Date로 변환해야 한다.
 */
@Setter
@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class FinancialRecordArticle extends Article {

  @Size(max = 30)
  @Column(nullable = true, unique = false, updatable = true, length = 30)
  private String title;
  @Size(max = 2_000)
  @Column(nullable = true, unique = false, updatable = true, length = 2_000)
  private String content;
  @NotNull
  @Column(nullable = false, unique = false, updatable = true)
  private LocalDate faDate;
  @NotBlank
  @Size(min = 1, max = 10)
  @Column(nullable = false, unique = false, updatable = true, length = 10)
  private String category;
  @NotNull
  @Column(nullable = false, unique = false, updatable = true)
  private Integer price;

  // 가계부 매핑
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "financial-Record-id")
  private FinancialRecord financialRecord;

  // 이미지 매핑
  // cascade = CascadeType.ALL : 부모 엔티티(board)에서 생성, 업데이트, 삭제되면 image도 동일하게 처리
  // orphanRemoval = true : 부모 엔티티(board)에서 image를 참조 제거하면 image엔티티에서도 DB에서 삭제
//  @OneToMany(mappedBy = "financialRecordArticle", cascade = CascadeType.ALL, orphanRemoval = true)
//  private List<Img> imgList = new ArrayList<>();

  // 유저 매핑
  @ManyToOne
  @JoinColumn(name = "user-id")
  private User user;
  // 댓글 매핑
  // 좋아요 매핑
  // 해시태그 매핑

  public FinancialRecordArticle(Scope scope, String title, String content, LocalDate faDate, String category, Integer price, FinancialRecord financialRecord) {
    super(scope);
    this.title = title;
    this.content = content;
    this.faDate = faDate;
    this.category = category;
    this.price = price;
    this.financialRecord = financialRecord;
  }
}

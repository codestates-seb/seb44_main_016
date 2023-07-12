package com.zerohip.server.financialRecordArticle.service;

import com.zerohip.server.common.scope.Scope;
import com.zerohip.server.financialRecord.entity.FinancialRecord;
import com.zerohip.server.financialRecord.repository.FinancialRecordRepository;
import com.zerohip.server.financialRecord.service.FinancialRecordService;
import com.zerohip.server.financialRecordArticle.dto.FinancialRecordArticleDto;
import com.zerohip.server.financialRecordArticle.entity.FinancialRecordArticle;
import com.zerohip.server.financialRecordArticle.repository.FinancialRecordArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class FinancialRecordArticleServiceImpl implements FinancialRecordArticleService {
  // 결합도 관련해서 고민이 필요해 보임
  private final FinancialRecordService financialRecordService;
  private final FinancialRecordArticleRepository repository;

  @Override
  public FinancialRecordArticle createFaRecArticle(Long financialRecordId, FinancialRecordArticle faRecArticle) {
    // 해당 가계부가 존재하는지 확인 -> 없으면 예외를 발생시키고 있으면 해당 가계부를 반환
    FinancialRecord faRec = financialRecordService.findFaRec(financialRecordId);

    // FinancialRecordArticle과 FinancialRecord의 관계를 설정
    faRecArticle.setFinancialRecord(faRec);

    // FinancialRecordArticle의 유효성 검사
    validateFaRecArticle(faRecArticle);

    return repository.save(faRecArticle);
  }

  // 가계부 조회(단건)
  @Override
  public FinancialRecordArticle findFaRecArticle(Long faRecArticleId) {
    return findVerifiedFaRecArticle(faRecArticleId);
  }

  // 가계부 전체 조회(동적쿼리 사용 예정)
  @Override
  public Page<FinancialRecordArticle> findFaRecArticles(Long financialRecordId, int page, int size) {
    return repository.findAll(PageRequest.of(page -1, size, Sort.by("financialRecordArticleId")));
  }

  // 가계부 수정
  @Override
  public FinancialRecordArticle updateFaRecArticle(Long faRecArticleId, FinancialRecordArticleDto.Patch patchParam) {
    FinancialRecordArticle findFaRecArticle = findVerifiedFaRecArticle(faRecArticleId);
    findFaRecArticle.setTitle(patchParam.getTitle());
    findFaRecArticle.setContent(patchParam.getContent());
    findFaRecArticle.setFaDate(patchParam.getFaDate());
    findFaRecArticle.setCategory(patchParam.getCategory());
    findFaRecArticle.setPrice(patchParam.getPrice());
    findFaRecArticle.setScope(patchParam.getScope());

    FinancialRecordArticle updateFaRecArticle = repository.save(findFaRecArticle);
    return updateFaRecArticle;
  }

  @Override
  public void deleteFaRecArticle(Long faRecArticleId) {
    FinancialRecordArticle findFaRecArticle = findVerifiedFaRecArticle(faRecArticleId);
    repository.delete(findFaRecArticle);
  }

  @Override
  public FinancialRecordArticle findVerifiedFaRecArticle(Long faRecArticleId) {
    Optional<FinancialRecordArticle> optionalFaRecArticle = repository.findById(faRecArticleId);
    FinancialRecordArticle findFaRecArticle = optionalFaRecArticle.orElseThrow(() -> new RuntimeException("해당 게시글이 존재하지 않습니다."));
    return findFaRecArticle;
  }

  // FinancialRecordArticle의 유효성 검사
  private void validateFaRecArticle(FinancialRecordArticle faRecArticle) {
    if (faRecArticle == null) {
      throw new IllegalArgumentException("게시글은 null이 될 수 없습니다.");
    }
    if (faRecArticle.getScope().equals(Scope.FEED)) {
      throw new IllegalArgumentException("게시글의 공개 범위는 FEED가 될 수 없습니다.");
    }
    if (faRecArticle.getTitle() == null ||
            faRecArticle.getTitle().trim().isEmpty() ||
            faRecArticle.getTitle().length() > 30) {
      throw new IllegalArgumentException("게시글의 제목은 null이 될 수 없고, 30자를 넘을 수 없습니다.");
    }
    if (faRecArticle.getContent().length() > 10000) {
      throw new IllegalArgumentException("게시글의 내용은 null이 될 수 없고, 10000자를 넘을 수 없습니다.");
    }
    if (faRecArticle.getFaDate() == null ||
      faRecArticle.getCategory() == null ||
      faRecArticle.getPrice() == null) {
      throw new IllegalArgumentException("해당 필드는 null또는 Blank이(가) 될 수 없습니다.");
    }
    // if문이 너무 많네요,, 수정의 필요성이 있어보입니다.
  }
}

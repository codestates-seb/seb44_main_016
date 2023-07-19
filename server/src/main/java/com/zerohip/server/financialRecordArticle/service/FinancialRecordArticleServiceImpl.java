package com.zerohip.server.financialRecordArticle.service;

import com.zerohip.server.common.scope.Scope;
import com.zerohip.server.common.userPrincipal.UserPrincipal;
import com.zerohip.server.financialRecord.entity.FinancialRecord;
import com.zerohip.server.financialRecord.service.FinancialRecordService;
import com.zerohip.server.financialRecordArticle.dto.FinancialRecordArticleDto;
import com.zerohip.server.financialRecordArticle.entity.FinancialRecordArticle;
import com.zerohip.server.financialRecordArticle.repository.FinancialRecordArticleRepository;
import com.zerohip.server.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
  public FinancialRecordArticle createFaRecArticle(User author, FinancialRecordArticle faRecArticle) {
    // 로그인된 사용자와 게시글 작성자가 같은지 확인
    VerifiedAuthor(author);

    // 해당 가계부가 존재하는지 확인 -> 없으면 예외를 발생시키고 있으면 해당 가계부를 반환
    FinancialRecord faRec = financialRecordService.findFaRec(faRecArticle.getFinancialRecord().getFinancialRecordId());

    // FinancialRecordArticle과 FinancialRecord의 관계를 설정
    faRecArticle.setFinancialRecord(faRec);
    faRecArticle.setUser(author);

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
    return repository.findAll(PageRequest.of(page -1, size, Sort.by("faDate").descending()));
  }

  // 가계부 수정
  @Override
  public FinancialRecordArticle updateFaRecArticle(User author, Long faRecArticleId, FinancialRecordArticleDto.Patch patchParam) {
    // 수정할 게시글 조회
    FinancialRecordArticle findFaRecArticle = findVerifiedFaRecArticle(faRecArticleId);
    // 로그인된 사용자와 수정할 게시글의 작성자가 같은지 확인
    userValid(findFaRecArticle);

    // 검증정보가 일치할 경우 수정
    findFaRecArticle.setTitle(patchParam.getTitle());
    findFaRecArticle.setContent(patchParam.getContent());
    findFaRecArticle.setFaDate(patchParam.getFaDate());
    findFaRecArticle.setCategory(patchParam.getCategory());
    findFaRecArticle.setPrice(patchParam.getPrice());
    findFaRecArticle.setScope(patchParam.getScope());

    return repository.save(findFaRecArticle);
  }

  @Override
  public void deleteFaRecArticle(User author, Long faRecArticleId) {
    // 삭제할 게시물 조회
    FinancialRecordArticle findFaRecArticle = findVerifiedFaRecArticle(faRecArticleId);
    // 로그인된 사용자와 삭제할 게시글의 작성자가 같은지 확인
    userValid(findFaRecArticle);

    // 검증정보가 일치할 경우 삭제
    repository.delete(findFaRecArticle);
  }

  // 게시글 조회 검증
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
  }

  // 로그인한 사용자와 게시글 작성자가 같은지 확인
  private static void VerifiedAuthor(User author) {
    UserPrincipal userPrincipal = getUserPrincipal();

    if(!userPrincipal.equals(author)) {
      throw new IllegalArgumentException("로그인한 사용자와 작성자가 일치하지 않습니다.");
    }
  }

  // 로그인한 사용자 정보 가져오기
  private static UserPrincipal getUserPrincipal() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
    return userPrincipal;
  }

  // 게시글 작성자와 로그인한 사용자가 같은지 확인
  private static void userValid(FinancialRecordArticle findFaRecArticle) {
    boolean isEquals = findFaRecArticle.getUser().equals(getUserPrincipal());
    if(!isEquals) {
      throw new RuntimeException("해당 게시글의 작성자가 아닙니다.");
    }
  }}

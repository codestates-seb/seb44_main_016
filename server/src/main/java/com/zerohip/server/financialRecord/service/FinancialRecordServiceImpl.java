package com.zerohip.server.financialRecord.service;

import com.zerohip.server.common.article.Article;
import com.zerohip.server.common.exception.BusinessLogicException;
import com.zerohip.server.common.exception.ExceptionCode;
import com.zerohip.server.common.scope.Scope;
import com.zerohip.server.financialRecord.dto.FinancialRecordDto;
import com.zerohip.server.financialRecord.entity.FinancialRecord;
import com.zerohip.server.financialRecord.repository.FinancialRecordRepository;
import com.zerohip.server.financialRecordArticle.entity.FinancialRecordArticle;
import com.zerohip.server.user.entity.User;
import com.zerohip.server.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * User 추가하기
 */
@Service
@Transactional
@RequiredArgsConstructor
public class FinancialRecordServiceImpl implements FinancialRecordService {

  private final FinancialRecordRepository repository;
  private final UserService userService;
  // 가계부 생성
  @Override
  public FinancialRecord createFaRec(User author, FinancialRecord faRec) {
    faRec.setUser(findUser(author));
    // 저장된 가계부(saveFaRec)를 반환
    return repository.save(faRec);
  }

  // 가계부 조회(단건)
  @Transactional(readOnly = true)
  @Override
  public FinancialRecord findFaRec(User author, Long faRecId) {
    // 해당 가계부가 존재하는지 확인 후 없으면 예외를 발생시키고 있으면 해당 가계부를 반환
    FinancialRecord findFaRec = findVerifiedFaRec(faRecId);

    // 전체 게시글 및 타임라인 수 조회
    findFaRec.setTotalCount(countTotal(findFaRec));
    findFaRec.setTimeLineCount(countTimeLine(findFaRec));
    VerifiedAuthor(author, findFaRec);
    return findFaRec;
  }

  // 가계부 전체 조회(동적쿼리 사용 예정)
  @Override
  public List<FinancialRecord> findFaRecs(User author) {
    return repository.findByUser(author);
  }

  // 가계부 수정
  @Override
  public FinancialRecord updateFaRec(User author, Long faRecId, FinancialRecordDto.Patch patchParam) {
    // 수정할 가계부 조회
    FinancialRecord findFaRec = findVerifiedFaRec(faRecId);

    // 로그인한 사용자와 가계부 소유자가 같은지 확인
    VerifiedAuthor(author, findFaRec);

    // 수정
    findFaRec.setFinancialRecordName(patchParam.getFinancialRecordName());
    findFaRec.setMemo(patchParam.getMemo());

    return repository.save(findFaRec);
  }

  // 가계부 삭제
  @Override
  public void deleteFaRec(User author, Long faRecId) {
    FinancialRecord findFaRec = findVerifiedFaRec(faRecId);
    VerifiedAuthor(author, findFaRec);
    repository.delete(findFaRec);
  }

  // 가계부 조회확인
  @Override
  public FinancialRecord findVerifiedFaRec(Long faRecId) {
    // 저장되어있는 가계부 중 해당 가계부가 있는지 확인
    Optional<FinancialRecord> optionalFaRec = repository.findById(faRecId);
    // 확인 후 없으면 예외를 발생시키고 있으면 해당 가계부를 반환
    FinancialRecord findFaRec = optionalFaRec.orElseThrow(() -> new IllegalArgumentException("해당 가계부가 없습니다."));
    // 해당 가계부가 저장된 findFaRec을 반환
    return findFaRec;
  }

  private int countTotal(FinancialRecord faRec) {
    return faRec.getFinancialRecordArticles().size();
  }

  private int countTimeLine(FinancialRecord faRec) {
    List<FinancialRecordArticle> articleList = faRec.getFinancialRecordArticles();
    int count = (int) articleList.stream()
            .filter(article -> article.getScope() == Scope.FAREC_TIMELINE)
            .count();

    return count;
  }

  // 로그인한 사용자와 가계부 소유자가 같은지 확인
  private void VerifiedAuthor(User author, FinancialRecord faRec) {
    // 사용자 인증 실패
    if(author == null) {
      throw new BusinessLogicException(ExceptionCode.AUTHOR_UNAUTHORIZED);
    }

    if(!author.getLoginId().equals(faRec.getUser().getLoginId())) {
      throw new BusinessLogicException(ExceptionCode.AUTHOR_UNAUTHORIZED);
    }
  }

  public User findUser(User author) {
    return userService.findUserByLoginId(author.getLoginId());
  }
}
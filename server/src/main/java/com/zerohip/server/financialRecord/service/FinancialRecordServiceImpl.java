package com.zerohip.server.financialRecord.service;

import com.zerohip.server.common.exception.BusinessLogicException;
import com.zerohip.server.common.exception.ExceptionCode;
import com.zerohip.server.common.img.entity.Img;
import com.zerohip.server.common.img.service.ImgService;
import com.zerohip.server.common.scope.Scope;
import com.zerohip.server.financialRecord.dto.FinancialRecordDto;
import com.zerohip.server.financialRecord.entity.FinancialRecord;
import com.zerohip.server.financialRecord.repository.FinancialRecordRepository;
import com.zerohip.server.financialRecordArticle.entity.FinancialRecordArticle;
import com.zerohip.server.user.entity.User;
import com.zerohip.server.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

/**
 * User 추가하기
 */
@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class FinancialRecordServiceImpl implements FinancialRecordService {

  private final FinancialRecordRepository repository;
  private final ImgService imgService;
  private final UserService userService;
  // 가계부 생성
  @Override
  public FinancialRecord createFaRec(String authorId, FinancialRecord faRec, MultipartFile file) {


    faRec.setUser(findUser(authorId));
    Img img = saveImg(faRec, file);
    faRec.setProfileImg(img);

    FinancialRecord savedFaRec = repository.save(faRec);
    log.info("savedFaRec.getArticleId() : {}", savedFaRec.getFinancialRecordId());
    log.info("savedFaRec.getFinancialRecordName() : {}", savedFaRec.getFinancialRecordName());
    log.info("savedFaRec.getMemo() : {}", savedFaRec.getMemo());
    log.info("savedFaRec.getProfileImg() : {}", savedFaRec.getProfileImg().getFilePath());
    log.info("savedFaRec.getTotalCount() : {}", savedFaRec.getTotalCount());
    log.info("savedFaRec.getTimeLineCount() : {}", savedFaRec.getTimeLineCount());

    return savedFaRec;
  }

  // 가계부 조회(단건)
  @Transactional(readOnly = true)
  @Override
  public FinancialRecord findFaRec(String authorId, Long faRecId) {
    // 해당 가계부가 존재하는지 확인 후 없으면 예외를 발생시키고 있으면 해당 가계부를 반환
    FinancialRecord findFaRec = findVerifiedFaRec(faRecId);

    // 전체 게시글 및 타임라인 수 조회
    findFaRec.setTotalCount(countTotal(findFaRec));
    findFaRec.setTimeLineCount(countTimeLine(findFaRec));
    VerifiedAuthor(authorId, findFaRec);
    return findFaRec;
  }

  @Transactional(readOnly = true)
  // 가계부 전체 조회(동적쿼리 사용 예정)
  @Override
  public List<FinancialRecord> findFaRecs(String authorId) {
    User findUser = userService.findUserByLoginId(authorId);
    List<FinancialRecord> financialRecords = findUser.getFinancialRecords();
    log.info("financialRecords : {}", financialRecords.toString());
    return financialRecords;
  }


  // 가계부 수정
  @Override
  public FinancialRecord updateFaRec(String authorId, Long faRecId, FinancialRecordDto.Patch patchParam, MultipartFile file) {
    // 삭제할 이미지
    String deleteFilePath = patchParam.getDeleteFilePath();

    // 수정할 가계부 조회
    FinancialRecord findFaRec = findVerifiedFaRec(faRecId);

    // 로그인한 사용자와 가계부 소유자가 같은지 확인
    VerifiedAuthor(authorId, findFaRec);

    // 검증정보가 일치할 경우 수정
    updateFaRecDetails(patchParam, findFaRec);

    // 삭제할 이미지가 있을 경우 삭제
    if(deleteFilePath != null) {
      imgService.deleteImg(findFaRec.getProfileImg());
    }

    // 새로운 이미지가 있으면 추가
    if(file != null) {
      Img img = saveImg(findFaRec, file);
      findFaRec.setProfileImg(img);
    }

    return repository.save(findFaRec);
  }

  private static void updateFaRecDetails(FinancialRecordDto.Patch patchParam, FinancialRecord findFaRec) {
    findFaRec.setFinancialRecordName(patchParam.getFinancialRecordName());
    findFaRec.setMemo(patchParam.getMemo());
  }

  // 가계부 삭제
  @Override
  public void deleteFaRec(String authorId, Long faRecId) {
    FinancialRecord findFaRec = findVerifiedFaRec(faRecId);
    VerifiedAuthor(authorId, findFaRec);
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
  private void VerifiedAuthor(String authorId, FinancialRecord faRec) {
    // 사용자 인증 실패
    if(authorId == null) {
      throw new BusinessLogicException(ExceptionCode.AUTHOR_UNAUTHORIZED);
    }

    if(!authorId.equals(faRec.getUser().getLoginId())) {
      throw new BusinessLogicException(ExceptionCode.AUTHOR_UNAUTHORIZED);
    }
  }

  public User findUser(String authorId) {
    return userService.findUserByLoginId(authorId);
  }

  private Img saveImg(FinancialRecord faRec, MultipartFile file) {
    try {
      return imgService.createImg(faRec, file);
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }
}
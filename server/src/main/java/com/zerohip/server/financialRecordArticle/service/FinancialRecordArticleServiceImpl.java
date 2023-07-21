package com.zerohip.server.financialRecordArticle.service;

import com.zerohip.server.common.article.Article;
import com.zerohip.server.common.exception.BusinessLogicException;
import com.zerohip.server.common.exception.ExceptionCode;
import com.zerohip.server.common.img.dto.ImgDto;
import com.zerohip.server.common.img.entity.Img;
import com.zerohip.server.common.img.service.ImgService;
import com.zerohip.server.common.scope.Scope;
import com.zerohip.server.financialRecord.entity.FinancialRecord;
import com.zerohip.server.financialRecord.service.FinancialRecordService;
import com.zerohip.server.financialRecordArticle.dto.FinancialRecordArticleDto;
import com.zerohip.server.financialRecordArticle.entity.FinancialRecordArticle;
import com.zerohip.server.financialRecordArticle.repository.FinancialRecordArticleRepository;
import com.zerohip.server.user.entity.User;
import com.zerohip.server.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class FinancialRecordArticleServiceImpl implements FinancialRecordArticleService {
  // 결합도 관련해서 고민이 필요해 보임
  private final FinancialRecordService financialRecordService;
  private final UserService userService;
  private final ImgService imgService;
  private final FinancialRecordArticleRepository repository;

  @Override
  public FinancialRecordArticle createFaRecArticle(Long financialRecordId, User author, FinancialRecordArticle faRecArticle, List<MultipartFile> files) {
    // 해당 가계부가 존재하는지 확인 -> 없으면 예외를 발생시키고 있으면 해당 가계부를 반환
    FinancialRecord faRec = financialRecordService.findFaRec(author, financialRecordId);

    // FinancialRecordArticle과 FinancialRecord의 관계를 설정
    faRecArticle.setFinancialRecord(faRec);
    faRecArticle.setUser(findUser(author));

    // FinancialRecordArticle의 유효성 검사 및 저장
    validateFaRecArticle(faRecArticle);
    FinancialRecordArticle savedFaRecArticle = repository.save(faRecArticle);

    // Img 객체 저장
    List<Img> imgList = saveImages(savedFaRecArticle, files);
    savedFaRecArticle.setImgList(imgList);

    return savedFaRecArticle;
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
  public FinancialRecordArticle updateFaRecArticle(User author, Long faRecArticleId, FinancialRecordArticleDto.Patch patchParam, List<MultipartFile> files) throws IOException {
    // 수정할 게시글 조회
    FinancialRecordArticle findFaRecArticle = findVerifiedFaRecArticle(faRecArticleId);
    // 로그인된 사용자와 수정할 게시글의 작성자가 같은지 확인
    VerifiedAuthor(author, findFaRecArticle);

    // 검증정보가 일치할 경우 수정
    findFaRecArticle.setTitle(patchParam.getTitle());
    findFaRecArticle.setContent(patchParam.getContent());
    findFaRecArticle.setFaDate(patchParam.getFaDate());
    findFaRecArticle.setCategory(patchParam.getCategory());
    findFaRecArticle.setPrice(patchParam.getPrice());
    findFaRecArticle.setScope(patchParam.getScope());

    for (Img img : findFaRecArticle.getImgList()) {
      Long imgId = img.getId();

      // 이미지가 유지될 경우 스킵
      if (patchParam.getKeepImgIds().contains(imgId)) {
        continue;
      }
      // 이미지가 업데이트될 경우
      if (patchParam.getUpdateImgs().containsKey(imgId)) {
        MultipartFile newFile = patchParam.getUpdateImgs().get(imgId);
        imgService.deleteImg(imgId);
        imgService.createImg(findFaRecArticle, List.of(newFile));
        continue;
      }
      // 이미지 삭제
      imgService.deleteImg(img.getId());
    }

    // 새 이미지 추가
    imgService.createImg(findFaRecArticle, files);

    return repository.save(findFaRecArticle);
  }

  @Override
  public void deleteFaRecArticle(User author, Long faRecArticleId) {
    // 삭제할 게시물 조회
    FinancialRecordArticle findFaRecArticle = findVerifiedFaRecArticle(faRecArticleId);
    // 로그인된 사용자와 삭제할 게시글의 작성자가 같은지 확인
    VerifiedAuthor(author, findFaRecArticle);

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
  private void VerifiedAuthor(User author, Article article) {
    // 사용자 인증 실패
    if(author == null) {
      throw new BusinessLogicException(ExceptionCode.AUTHOR_UNAUTHORIZED);
    }
    // article to FinancialRecordArticle
    FinancialRecordArticle faRecArticle = (FinancialRecordArticle) article;

    if(!author.getLoginId().equals(faRecArticle.getUser().getLoginId())) {
      throw new BusinessLogicException(ExceptionCode.AUTHOR_UNAUTHORIZED);
    }
  }

  public User findUser(User author) {
    return userService.findUserByLoginId(author.getLoginId());
  }
  private List<Img> saveImages(FinancialRecordArticle faRecArticle, List<MultipartFile> files) {
    try {
      return imgService.createImg(faRecArticle, files);
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }
}

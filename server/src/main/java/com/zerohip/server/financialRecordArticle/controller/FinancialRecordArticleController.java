package com.zerohip.server.financialRecordArticle.controller;

import com.zerohip.server.financialRecordArticle.dto.FinancialRecordArticleDto;
import com.zerohip.server.financialRecordArticle.entity.FinancialRecordArticle;
import com.zerohip.server.financialRecordArticle.mapper.FinancialRecordArticleMapper;
import com.zerohip.server.financialRecordArticle.service.FinancialRecordArticleService;
import com.zerohip.server.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;
import java.net.URI;
import java.util.List;

/**
 * 추후 Dto에서 가계부 ID값으로 받아온다음에 파라미터가 아닌 Dto를 가져올 때 함께 포함할 수 있도록 수정 예정
 */
@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/financial-record/{financial-record-id}/article")
public class FinancialRecordArticleController {

  private final FinancialRecordArticleService service;
  private final FinancialRecordArticleMapper mapper;

  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity createFinancialRecordArticle(@RequestPart("requestbody") @Valid FinancialRecordArticleDto.Post requestbody,
                                                     @PathVariable("financial-record-id") Long financialRecordId,
                                                     @AuthenticationPrincipal User author,
                                                     @RequestPart("files") List<MultipartFile> files) {

    FinancialRecordArticle saveFaRecArticle = service.createFaRecArticle(financialRecordId, author, mapper.financialRecordArticlePostToFinancialRecordArticle(requestbody), files);

    URI uri = URI.create("/financial-record/" + financialRecordId + "/article/" + saveFaRecArticle.getArticleId());

    log.info("saveFaRecArticle.getCreatedAt() : {}", saveFaRecArticle.getCreatedAt());

    return ResponseEntity.created(uri).body(mapper.financialRecordArticleToFinancialRecordArticleResponse(saveFaRecArticle));
  }

  @GetMapping("/{financial-record-article-id}")
  public ResponseEntity getFinancialRecordArticles(@PathVariable("financial-record-id") Long financialRecordId,
                                                   @PathVariable("financial-record-article-id") Long financialRecordArticleId) {
    FinancialRecordArticle verifiedFaRecArticle = service.findVerifiedFaRecArticle(financialRecordArticleId);

    return ResponseEntity.ok(mapper.financialRecordArticleToFinancialRecordArticleResponse(verifiedFaRecArticle));
  }

  @GetMapping
  public ResponseEntity getFinancialRecordArticles(@PathVariable("financial-record-id") Long financialRecordId,
                                                   @Positive @RequestParam int page,
                                                   @Positive @RequestParam int size) {
    Page<FinancialRecordArticle> pageFaRecArticles = service.findFaRecArticles(financialRecordId, page, size);
    List<FinancialRecordArticle> allFaRecArticles = pageFaRecArticles.getContent();
    return ResponseEntity.ok(mapper.financialRecordArticlesToFinancialRecordArticleResponses(allFaRecArticles));
  }

  @PatchMapping("/{financial-record-article-id}")
  public ResponseEntity patchFinancialRecord(@RequestPart("requestbody") @Valid FinancialRecordArticleDto.Patch requestbody,
                                             @PathVariable("financial-record-article-id") Long financialRecordArticleId,
                                             @AuthenticationPrincipal User author,
                                             @RequestPart("files") List<MultipartFile> files) {
    FinancialRecordArticle updatedFaRecArticle = service.updateFaRecArticle(author, financialRecordArticleId, requestbody, files);

    return ResponseEntity.ok(mapper.financialRecordArticleToFinancialRecordArticleResponse(updatedFaRecArticle));
  }

  @DeleteMapping("/{financial-record-article-id}")
  public ResponseEntity deleteFinancialRecord(@PathVariable("financial-record-article-id") Long financialRecordArticleId,
                                              @AuthenticationPrincipal User author) {
    service.deleteFaRecArticle(author, financialRecordArticleId);

    return ResponseEntity.noContent().build();
  }
}

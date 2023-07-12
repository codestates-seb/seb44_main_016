package com.zerohip.server.financialRecordArticle.controller;

import com.zerohip.server.financialRecordArticle.dto.FinancialRecordArticleDto;
import com.zerohip.server.financialRecordArticle.entity.FinancialRecordArticle;
import com.zerohip.server.financialRecordArticle.mapper.FinancialRecordArticleMapper;
import com.zerohip.server.financialRecordArticle.service.FinancialRecordArticleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/financial-record/{financial-record-id}/article")
public class FinancialRecordArticleController {

  private final static String FINANCIAL_RECORD_ARTICLE_DEFAULT_URI = "/financial-record/{financialRecordId}/article";
  private final FinancialRecordArticleService service;
  private final FinancialRecordArticleMapper mapper;

  @PostMapping
  public ResponseEntity createFinancialRecordArticle(@Valid @RequestBody FinancialRecordArticleDto.Post requestbody,
                                                     @PathVariable("financial-record-id") Long financialRecordId) {
    FinancialRecordArticle saveFaRecArticle = service.createFaRecArticle(financialRecordId, mapper.financialRecordArticlePostToFinancialRecordArticle(requestbody));

    URI uri = URI.create(FINANCIAL_RECORD_ARTICLE_DEFAULT_URI.replace("{financialRecordId}", String.valueOf(financialRecordId)).concat("/").concat(String.valueOf(saveFaRecArticle.getFinancialRecordArticleId())));

    log.info("saveFaRecArticle.getCreatedAt() : {}", saveFaRecArticle.getCreatedAt());

    return ResponseEntity.created(uri).body(mapper.financialRecordArticleToFinancialRecordArticleResponse(saveFaRecArticle));
  }

  @GetMapping("/{financial-record-article-id}")
  public ResponseEntity getFinancialRecordArticles(@PathVariable("financial-record-id") Long financialRecordId) {
    FinancialRecordArticle verifiedFaRecArticle = service.findVerifiedFaRecArticle(financialRecordId);

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
  public ResponseEntity patchFinancialRecord(@PathVariable("financial-record-article-id") Long financialRecordArticleId,
                                             @Valid @RequestBody FinancialRecordArticleDto.Patch requestbody) {
    FinancialRecordArticle updatedFaRecArticle = service.updateFaRecArticle(financialRecordArticleId, requestbody);

    return ResponseEntity.ok(mapper.financialRecordArticleToFinancialRecordArticleResponse(updatedFaRecArticle));
  }

  @DeleteMapping("/{financial-record-article-id}")
  public ResponseEntity deleteFinancialRecord(@PathVariable("financial-record-article-id") Long financialRecordArticleId) {
    service.deleteFaRecArticle(financialRecordArticleId);

    return ResponseEntity.noContent().build();
  }

}

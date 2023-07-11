package com.zerohip.server.financialRecordArticle.repository;

import com.zerohip.server.common.scope.Scope;
import com.zerohip.server.financialRecordArticle.entity.FinancialRecordArticle;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@Slf4j
@Transactional
@SpringBootTest
class FinancialRecordArticleRepositoryTest {

  @Autowired
  FinancialRecordArticleRepository financialRecordArticleRepository;

  Date now;
  FinancialRecordArticle financialRecordArticle;
  @BeforeEach
  void setUp() {
    now = new Date();
    financialRecordArticle = new FinancialRecordArticle("test title", "test content", now, "테스트", 1000, Scope.FAREC_ARTICLE);
    log.info("A new FinancialRecordArticle has been set up with ID: " + financialRecordArticle.getFinancialRecordArticleId());
  }

  @Test
  @DisplayName("가계부 기록 생성")
  void save() {

    FinancialRecordArticle saveFaRecArticle = financialRecordArticleRepository.save(financialRecordArticle);
    log.info("saveFaRecArticle.getTitle() = {}", saveFaRecArticle.getTitle());
    log.info("saveFaRecArticle.getContent() = {}", saveFaRecArticle.getContent());
    log.info("saveFaRecArticle.getFaDate() = {}", saveFaRecArticle.getFaDate());
    log.info("saveFaRecArticle.getCategory() = {}", saveFaRecArticle.getCategory());
    log.info("saveFaRecArticle.getPrice() = {}", saveFaRecArticle.getPrice());
    log.info("saveFaRecArticle.getScope() = {}", saveFaRecArticle.getScope());

    // Verify
    assertEquals(financialRecordArticle.getTitle(), saveFaRecArticle.getTitle());
    assertEquals(financialRecordArticle.getContent(), saveFaRecArticle.getContent());
    assertEquals(financialRecordArticle.getFaDate(), saveFaRecArticle.getFaDate());
    assertEquals(financialRecordArticle.getCategory(), saveFaRecArticle.getCategory());
    assertEquals(financialRecordArticle.getPrice(), saveFaRecArticle.getPrice());
    assertEquals(financialRecordArticle.getScope(), saveFaRecArticle.getScope());
    assertNotNull(saveFaRecArticle);
    assertNotNull(saveFaRecArticle.getFinancialRecordArticleId());

  }

  @Test
  @DisplayName("가계부 기록 조회(단건)")
  void findById() {
    FinancialRecordArticle saveFaRecArticle = financialRecordArticleRepository.save(financialRecordArticle);
    Optional<FinancialRecordArticle> optionalFaRecArticle = financialRecordArticleRepository.findById(saveFaRecArticle.getFinancialRecordArticleId());
    FinancialRecordArticle findFaRecArticle = optionalFaRecArticle.orElseThrow(() -> new RuntimeException("가계부 기록이 없습니다."));

    // Verify
    assertEquals(financialRecordArticle.getTitle(), findFaRecArticle.getTitle());
    assertEquals(financialRecordArticle.getContent(), findFaRecArticle.getContent());
    assertEquals(financialRecordArticle.getFaDate(), findFaRecArticle.getFaDate());
    assertEquals(financialRecordArticle.getCategory(), findFaRecArticle.getCategory());
    assertEquals(financialRecordArticle.getPrice(), findFaRecArticle.getPrice());
    assertEquals(financialRecordArticle.getScope(), findFaRecArticle.getScope());
    assertNotNull(findFaRecArticle);
    assertNotNull(findFaRecArticle.getFinancialRecordArticleId());
  }

  @Test
  @DisplayName("가계부 기록 조회(전체)")
  void findAll() {
    FinancialRecordArticle saveFaRecArticle1 = financialRecordArticleRepository.save(financialRecordArticle);
    log.info("saveFaRecArticle.getTitle() = {}", saveFaRecArticle1.getTitle());

    FinancialRecordArticle financialRecordArticle2 = new FinancialRecordArticle("test title2", "test content2", now, "테스트2", 2000, Scope.FAREC_ARTICLE);
    FinancialRecordArticle saveFaRecArticle2 = financialRecordArticleRepository.save(financialRecordArticle2);

    log.info("saveFaRecArticle1.getId() = {}", saveFaRecArticle1.getFinancialRecordArticleId());
    log.info("saveFaRecArticle2.getId() = {}", saveFaRecArticle2.getFinancialRecordArticleId());


    List<FinancialRecordArticle> findFaRecArticles = financialRecordArticleRepository.findAll();

    // Verify
    assertThat(findFaRecArticles.size()).isEqualTo(2);
    assertThat(findFaRecArticles).contains(saveFaRecArticle1, saveFaRecArticle2);
  }

  @Test
  @DisplayName("가계부 기록 수정")
  void update() {
    FinancialRecordArticle saveFaRecArticle = financialRecordArticleRepository.save(financialRecordArticle);
    Optional<FinancialRecordArticle> optionalFaRecArticle = financialRecordArticleRepository.findById(saveFaRecArticle.getFinancialRecordArticleId());
    FinancialRecordArticle findFaRecArticle = optionalFaRecArticle.orElseThrow(() -> new RuntimeException("가계부 기록이 없습니다."));
    findFaRecArticle.setTitle("update title");
    findFaRecArticle.setContent("update content");

    FinancialRecordArticle updateFaRecArticle = financialRecordArticleRepository.save(findFaRecArticle);
    log.info("updateFaRecArticle.getTitle() = {}", updateFaRecArticle.getTitle());
    log.info("updateFaRecArticle.getContent() = {}", updateFaRecArticle.getContent());
    log.info("updateFaRecArticle.getFaDate() = {}", updateFaRecArticle.getFaDate());
    log.info("updateFaRecArticle.getCategory() = {}", updateFaRecArticle.getCategory());
    log.info("updateFaRecArticle.getPrice() = {}", updateFaRecArticle.getPrice());
    log.info("updateFaRecArticle.getScope() = {}", updateFaRecArticle.getScope());


    // Verify
    assertEquals(findFaRecArticle.getTitle(), updateFaRecArticle.getTitle());
    assertEquals(findFaRecArticle.getContent(), updateFaRecArticle.getContent());
    assertEquals(findFaRecArticle.getFaDate(), updateFaRecArticle.getFaDate());
    assertEquals(findFaRecArticle.getCategory(), updateFaRecArticle.getCategory());
    assertEquals(findFaRecArticle.getPrice(), updateFaRecArticle.getPrice());
    assertEquals(findFaRecArticle.getScope(), updateFaRecArticle.getScope());
  }

  @Test
  @DisplayName("가계부 기록 삭제")
  void delete() {
    FinancialRecordArticle saveFaRecArticle = financialRecordArticleRepository.save(financialRecordArticle);
    financialRecordArticleRepository.delete(saveFaRecArticle);

    Optional<FinancialRecordArticle> optionalFaRecArticle = financialRecordArticleRepository.findById(saveFaRecArticle.getFinancialRecordArticleId());
    FinancialRecordArticle findFaRecArticle = optionalFaRecArticle.orElse(null);

    // Verify
    assertNull(findFaRecArticle);
  }

}
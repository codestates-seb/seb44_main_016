package com.zerohip.server.financialRecordArticle.repository;

import com.zerohip.server.financialRecordArticle.entity.FinancialRecordArticle;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@Slf4j
@Transactional
@SpringBootTest
class FinancialRecordArticleRepositoryTest {

  @Autowired
  FinancialRecordArticleRepository financialRecordArticleRepository;

  @Test
  @DisplayName("가계부 기록 생성")
  void save() {
    new FinancialRecordArticle();
  }

  @Test
  @DisplayName("가계부 기록 조회(단건)")
  void findById() {
    new FinancialRecordArticle();
  }

  @Test
  @DisplayName("가계부 기록 조회(전체)")
  void findAll() {
    new FinancialRecordArticle();
  }

  @Test
  @DisplayName("가계부 기록 수정")
  void update() {
    new FinancialRecordArticle();
  }

  @Test
  @DisplayName("가계부 기록 삭제")
  void delete() {
    new FinancialRecordArticle();
  }

}
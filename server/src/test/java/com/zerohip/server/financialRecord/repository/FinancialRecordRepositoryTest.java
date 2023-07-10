package com.zerohip.server.financialRecord.repository;

import com.zerohip.server.financialRecord.entity.FinancialRecord;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@Slf4j
@Transactional
@SpringBootTest
class FinancialRecordRepositoryTest {

  @Autowired
  FinancialRecordRepository financialRecordRepository;

  FinancialRecord faRec;
  @BeforeEach
  void setUp() {
    // 가계부 인스턴스 생성
    faRec = new FinancialRecord("test용 가계부");
  }

  @Test
  @DisplayName("가계부 생성")
  void save() {
    // 생성된 인스턴스의 정보로 가계부 생성 후 saveFaRec에 저장
    FinancialRecord saveFaRec = financialRecordRepository.save(faRec);
    log.info("saveFaRec.getFinancialRecordName() = {}", saveFaRec.getFinancialRecordName());

    assertThat(saveFaRec.getFinancialRecordName()).isEqualTo(faRec.getFinancialRecordName());
  }

  @Test
  @DisplayName("가계부 조회(단건)")
  void findById() {
    // 생성된 인스턴스의 정보로 가계부 생성 후 saveFaRec에 저장
    FinancialRecord saveFaRec = financialRecordRepository.save(faRec);
    log.info("saveFaRec.getFinancialRecordName() = {}", saveFaRec.getFinancialRecordName());

    // 생성된 가계부의 id로 조회
    Optional<FinancialRecord> findFaRec = financialRecordRepository.findById(saveFaRec.getFinancialRecordId());
    log.info("findFaRec.getFinancialRecordName() = {}", findFaRec.get().getFinancialRecordName());

    // Verify
    assertThat(findFaRec.get().getFinancialRecordName()).isEqualTo(saveFaRec.getFinancialRecordName());
  }

  @Test
  @DisplayName("가계부 조회(전체)")
  void findAll() {
    // 생성된 인스턴스의 정보로 가계부 생성 후 saveFaRec에 저장
    FinancialRecord saveFaRec = financialRecordRepository.save(faRec);

    // 다른 가계부 인스턴스 생성 및 저장
    FinancialRecord faRec2 = new FinancialRecord("test용 가계부2");
    FinancialRecord saveFaRec2 = financialRecordRepository.save(faRec2);

    log.info("saveFaRec.getFinancialRecordName() = {}", saveFaRec.getFinancialRecordName());
    log.info("saveFaRec2.getFinancialRecordName() = {}", saveFaRec2.getFinancialRecordName());

    // 생성된 가계부 전체 조회
    Iterable<FinancialRecord> findFaRec = financialRecordRepository.findAll();

    // Verify
    assertThat(findFaRec).hasSize(2);
    assertThat(findFaRec).contains(saveFaRec, saveFaRec2);
  }

  @Test
  @DisplayName("가계부 삭제")
  void delete() {
    // 생성된 인스턴스의 정보로 가계부 생성 후 saveFaRec에 저장
    FinancialRecord saveFaRec = financialRecordRepository.save(faRec);
    log.info("saveFaRec.getFinancialRecordName() = {}", saveFaRec.getFinancialRecordName());

    // 생성된 가계부 삭제
    financialRecordRepository.delete(saveFaRec);

    // Verify
    assertThat(financialRecordRepository.findById(saveFaRec.getFinancialRecordId())).isEmpty();
  }




}
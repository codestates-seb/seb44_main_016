package com.zerohip.server.financialRecord.service;

import com.zerohip.server.financialRecord.dto.FinancialRecordDto;
import com.zerohip.server.financialRecord.entity.FinancialRecord;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

/**
 * TODO:
 * - 예외나, 실패에 해당하는 테스트 코드도 필요할 것 같음.
 */
@Slf4j
@Transactional
@SpringBootTest
class FinancialRecordServiceImplTest {

  @Autowired
  FinancialRecordService financialRecordService;

  FinancialRecord faRec;
  @BeforeEach
  void setUp() {
    // 가계부 인스턴스 생성
    faRec = new FinancialRecord("test용 가계부");
  }

  @Test
  @DisplayName("가계부 생성")
  void createFaRec() {
    // 생성된 인스턴스의 정보로 가계부 생성 후 saveFaRec에 저장
    FinancialRecord saveFaRec = financialRecordService.createFaRec(faRec);
    log.info("saveFaRec.getFinancialRecordName() = {}", saveFaRec.getFinancialRecordName());

    // Verify
    assertEquals(faRec.getFinancialRecordName(), saveFaRec.getFinancialRecordName());
  }

  @Test
  @DisplayName("가계부 조회(단건)")
  void findFaRec() {
    // 생성된 인스턴스의 정보로 가계부 생성 후 saveFaRec에 저장
    FinancialRecord saveFaRec = financialRecordService.createFaRec(faRec);
    log.info("saveFaRec.getFinancialRecordName() = {}", saveFaRec.getFinancialRecordName());

    // 생성된 가계부의 id로 조회
    FinancialRecord findFaRec = financialRecordService.findFaRec(saveFaRec.getFinancialRecordId());
    log.info("findFaRec.getFinancialRecordName() = {}", findFaRec.getFinancialRecordName());

    // Verify
    assertEquals(saveFaRec.getFinancialRecordName(), findFaRec.getFinancialRecordName());
  }

  @Test
  @DisplayName("가계부 전체 조회(동적쿼리 사용 예정)")
  void findAllFaRecs() {
    // 생성된 인스턴스의 정보로 가계부 생성 후 saveFaRec에 저장
    FinancialRecord saveFaRec1 = financialRecordService.createFaRec(faRec);

    FinancialRecord faRec2 = new FinancialRecord("test용 가계부2");
    FinancialRecord saveFaRec2 = financialRecordService.createFaRec(faRec2);

    log.info("saveFaRec1.getFinancialRecordName() = {}", saveFaRec1.getFinancialRecordName());
    log.info("saveFaRec2.getFinancialRecordName() = {}", saveFaRec2.getFinancialRecordName());

    // 생성된 가계부의 id로 조회
    financialRecordService.findAllFaRecs();

    // Verify
//    assertThat(financialRecordService.findAllFaRecs());
  }

  @Test
  @DisplayName("가계부 수정")
  void updateFaRec() {
    // 생성된 인스턴스의 정보로 가계부 생성 후 saveFaRec에 저장
    FinancialRecord saveFaRec = financialRecordService.createFaRec(faRec);
    log.info("saveFaRec.getFinancialRecordName() = {}", saveFaRec.getFinancialRecordName());

    // 수정한 가계부 양식
    FinancialRecord updateFaRec = financialRecordService.updateFaRec
            (
                    saveFaRec.getFinancialRecordId(),
                    new FinancialRecordDto.Patch("수정된 가계부")
            );
    log.info("updateFaRec.getFinancialRecordName() = {}", updateFaRec.getFinancialRecordName());

    // 수정된 가계부를 id로 조회
    FinancialRecord findFaRec = financialRecordService.findFaRec(updateFaRec.getFinancialRecordId());
    log.info("findFaRec.getFinancialRecordName() = {}", findFaRec.getFinancialRecordName());

    // Verify
    assertEquals(updateFaRec.getFinancialRecordName(), findFaRec.getFinancialRecordName());
  }

  @Test
  @DisplayName("가계부 삭제")
  void deleteParam() {
    // 생성된 인스턴스의 정보로 가계부 생성 후 saveFaRec에 저장
    FinancialRecord saveFaRec = financialRecordService.createFaRec(faRec);
    log.info("saveFaRec.getFinancialRecordName() = {}", saveFaRec.getFinancialRecordName());

    // saveFarec의 id로 가계부를 조회하여 삭제
    financialRecordService.deleteFaRec(saveFaRec.getFinancialRecordId());

    // Verify
    assertThrows(RuntimeException.class, () -> financialRecordService.findFaRec(saveFaRec.getFinancialRecordId()));
  }
}
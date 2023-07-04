package com.zerohip.server.financialRecord.repository;

import com.zerohip.server.financialRecord.entity.FinancialRecord;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@Slf4j
@Transactional
@SpringBootTest
class FinancialRecordRepositoryTest {

  @Autowired
  FinancialRecordRepository financialRecordRepository;

  @Test
  void createFaRec() {
    FinancialRecord faRec = new FinancialRecord("test용 가계부");
    FinancialRecord saveFaRec = financialRecordRepository.save(faRec);
    log.info("saveFaRec.getFinancialRecordName() = {}", saveFaRec.getFinancialRecordName());

    Optional<FinancialRecord> optionalFaRec = financialRecordRepository.findById(saveFaRec.getFinancialRecordId());
    FinancialRecord findFaRec = optionalFaRec.orElseThrow(() -> new RuntimeException("가계부가 없습니다."));
    log.info("findFaRec.getFinancialRecordName() = {}", findFaRec.getFinancialRecordName());

    assertEquals(faRec.getFinancialRecordName(), saveFaRec.getFinancialRecordName());
    assertEquals(saveFaRec.getFinancialRecordName(), findFaRec.getFinancialRecordName());
  }

}
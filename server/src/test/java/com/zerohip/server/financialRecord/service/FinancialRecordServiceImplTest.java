package com.zerohip.server.financialRecord.service;

import com.zerohip.server.financialRecord.entity.FinancialRecord;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@Slf4j
@Transactional
@SpringBootTest
class FinancialRecordServiceImplTest {

  @Autowired
  FinancialRecordService financialRecordService;

  @Test
  void createFaRec() {
    FinancialRecord faRec = new FinancialRecord("test용 가계부");
    FinancialRecord saveFaRec = financialRecordService.createFaRec(faRec);
    log.info("saveFaRec.getFinancialRecordName() = {}", saveFaRec.getFinancialRecordName());

    assertEquals(faRec.getFinancialRecordName(), saveFaRec.getFinancialRecordName());
  }
}
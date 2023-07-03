package com.zerohip.server.financialRecord.service;

import com.zerohip.server.financialRecord.entity.FinancialRecord;


public interface FinancialRecordService {

  // 가계부 생성
  FinancialRecord createFaRec(FinancialRecord faRec);

  // 가계부 조회(단건)
  FinancialRecord findFaRec(Long faRecId);

  // 가계부 조회(전체)
  FinancialRecord findAllFaRecs();

  // 가계부 수정
  FinancialRecord updateFaRec(FinancialRecord faRec);

  // 가계부 삭제
  void deleteFaRec(Long faRecId);
}


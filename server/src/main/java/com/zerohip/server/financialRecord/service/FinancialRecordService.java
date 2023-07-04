package com.zerohip.server.financialRecord.service;

import com.zerohip.server.financialRecord.entity.FinancialRecord;

public interface FinancialRecordService {

  // 가계부 생성
  FinancialRecord createFaRec(FinancialRecord faRec);

  // 가계부 조회(단건)
  FinancialRecord findFaRec(Long faRecId);

  // 가계부 전체 조회(동적쿼리 사용 예정)
  FinancialRecord findAllFaRecs();

  // 가계부 수정
  FinancialRecord updateFaRec(FinancialRecord faRec);

  // 가계부 삭제
  void deleteFaRec(Long faRecId);

  // 가계부 조회확인
  FinancialRecord findVerifiedFaRec(Long faRecId);
}


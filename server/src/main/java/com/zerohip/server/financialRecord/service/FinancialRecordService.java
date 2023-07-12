package com.zerohip.server.financialRecord.service;

import com.zerohip.server.financialRecord.dto.FinancialRecordDto;
import com.zerohip.server.financialRecord.entity.FinancialRecord;
import org.springframework.data.domain.Page;

import java.util.List;

public interface FinancialRecordService {
  // 가계부 생성
  FinancialRecord createFaRec(FinancialRecord faRec);

  // 가계부 조회(단건)
  FinancialRecord findFaRec(Long faRecId);

  // 가계부 전체 조회(동적쿼리 사용 예정)
  Page<FinancialRecord> findFaRecs(int page, int size);

  // 가계부 수정
  //FinancialRecord updateFaRec(Long faRecId, FinancialRecordDto.Patch patchParam);

  // 가계부 삭제
  void deleteFaRec(Long faRecId);

  // 가계부 조회확인
  FinancialRecord findVerifiedFaRec(Long faRecId);
}


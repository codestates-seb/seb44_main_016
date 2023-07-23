package com.zerohip.server.financialRecord.service;

import com.zerohip.server.financialRecord.dto.FinancialRecordDto;
import com.zerohip.server.financialRecord.entity.FinancialRecord;
import com.zerohip.server.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FinancialRecordService {
  // 가계부 생성
  FinancialRecord createFaRec(String authorId, FinancialRecord faRec, MultipartFile file);

  // 가계부 조회(단건)
  FinancialRecord findFaRec(User author, Long faRecId);

  // 가계부 전체 조회(동적쿼리 사용 예정)
  List<FinancialRecord> findFaRecs(User author);

  // 가계부 수정
  FinancialRecord updateFaRec(User author, Long faRecId, FinancialRecordDto.Patch patchParam, MultipartFile file);

  // 가계부 삭제
  void deleteFaRec(User author, Long faRecId);

  // 가계부 조회확인
  FinancialRecord findVerifiedFaRec(Long faRecId);

  User findUser(String userId);
}
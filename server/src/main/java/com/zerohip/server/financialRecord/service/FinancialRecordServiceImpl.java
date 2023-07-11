package com.zerohip.server.financialRecord.service;

import com.zerohip.server.financialRecord.dto.FinancialRecordDto;
import com.zerohip.server.financialRecord.entity.FinancialRecord;
import com.zerohip.server.financialRecord.repository.FinancialRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * User 추가하기
 */
@Service
@Transactional
@RequiredArgsConstructor
public class FinancialRecordServiceImpl implements FinancialRecordService {

  private final FinancialRecordRepository repository;
  // 가계부 생성
  @Override
  public FinancialRecord createFaRec(FinancialRecord faRec) {
    // 생성하려는 가계부를 저장하고 해당 가계부를 saveFaRec에 저장
    // 저장된 가계부(saveFaRec)를 반환
    return repository.save(faRec);
  }

  // 가계부 조회(단건)
  @Transactional(readOnly = true)
  @Override
  public FinancialRecord findFaRec(Long faRecId) {
    // 해당 가계부가 존재하는지 확인 후 없으면 예외를 발생시키고 있으면 해당 가계부를 반환
    return findVerifiedFaRec(faRecId);
  }

  // 가계부 전체 조회(동적쿼리 사용 예정)
  @Override
  public List<FinancialRecord> findFaRecs() {
    return repository.findAll();
  }

  // 가계부 수정
  @Override
  public FinancialRecord updateFaRec(Long faRecId, FinancialRecordDto.Patch patchParam) {
    FinancialRecord findFaRec = findVerifiedFaRec(faRecId);
    findFaRec.setFinancialRecordName(patchParam.getFinancialRecordName());
    findFaRec.setFinancialRecordDescription(patchParam.getFinancialRecordDescription());

    FinancialRecord updateFaRec = repository.save(findFaRec);
    return updateFaRec;
  }

  // 가계부 삭제
  @Override
  public void deleteFaRec(Long faRecId) {
    FinancialRecord findFaRec = findVerifiedFaRec(faRecId);
    repository.delete(findFaRec);
  }

  // 가계부 조회확인
  @Override
  public FinancialRecord findVerifiedFaRec(Long faRecId) {
    // 저장되어있는 가계부 중 해당 가계부가 있는지 확인
    Optional<FinancialRecord> optionalFaRec = repository.findById(faRecId);
    // 확인 후 없으면 예외를 발생시키고 있으면 해당 가계부를 반환
    FinancialRecord findFaRec = optionalFaRec.orElseThrow(() -> new IllegalArgumentException("해당 가계부가 없습니다."));
    // 해당 가계부가 저장된 findFaRec을 반환
    return findFaRec;
  }
}

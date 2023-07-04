package com.zerohip.server.financialRecord.service;

import com.zerohip.server.financialRecord.entity.FinancialRecord;
import com.zerohip.server.financialRecord.repository.FinancialRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * User 추가하기
 */
@Service
@Transactional
@RequiredArgsConstructor
public class FinancialRecordServiceImpl implements FinancialRecordService {

  private final FinancialRecordRepository repository;

  @Override
  public FinancialRecord createFaRec(FinancialRecord faRec) {
    FinancialRecord saveFaRec = repository.save(faRec);
    return saveFaRec;
  }

  @Override
  public FinancialRecord findFaRec(Long faRecId) {
    return null;
  }

  @Override
  public FinancialRecord findAllFaRecs() {
    return null;
  }

  @Override
  public FinancialRecord updateFaRec(FinancialRecord faRec) {
    return null;
  }

  @Override
  public void deleteFaRec(Long faRecId) {

  }
}

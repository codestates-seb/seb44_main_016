package com.zerohip.server.financialRecord.repository;

import com.zerohip.server.financialRecord.entity.FinancialRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FinancialRecordRepository extends JpaRepository<FinancialRecord, Long> {
}

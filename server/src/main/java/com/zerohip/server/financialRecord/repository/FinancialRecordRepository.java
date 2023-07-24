package com.zerohip.server.financialRecord.repository;

import com.zerohip.server.financialRecord.entity.FinancialRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FinancialRecordRepository extends JpaRepository<FinancialRecord, Long> {
}
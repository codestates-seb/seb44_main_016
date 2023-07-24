package com.zerohip.server.financialRecord.repository;

import com.zerohip.server.financialRecord.entity.FinancialRecord;
import com.zerohip.server.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface FinancialRecordRepository extends JpaRepository<FinancialRecord, Long> {
//  List<FinancialRecord> findByUser(String authorId);

  Optional<List<FinancialRecord>> findByUser(User user);
}
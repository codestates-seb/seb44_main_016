package com.zerohip.server.financialRecord.repository;

import com.zerohip.server.financialRecord.entity.FinancialRecord;
import com.zerohip.server.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FinancialRecordRepository extends JpaRepository<FinancialRecord, Long> {
  @Query("SELECT fr FROM FinancialRecord fr JOIN FETCH fr.user WHERE fr.user.loginId = :authorId")
  List<FinancialRecord> findAllByAuthorId(@Param("authorId") String authorId);
}
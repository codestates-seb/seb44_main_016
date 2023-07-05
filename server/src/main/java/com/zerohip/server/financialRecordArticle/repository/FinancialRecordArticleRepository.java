package com.zerohip.server.financialRecordArticle.repository;

import com.zerohip.server.financialRecordArticle.entity.FinancialRecordArticle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface FinancialRecordArticleRepository extends JpaRepository<FinancialRecordArticle, Long> {
}

package com.zerohip.server.financialRecordArticle.service;

import com.zerohip.server.financialRecordArticle.entity.FinancialRecordArticle;

import java.util.List;

public interface FinancialRecordArticleService {

  // 가계부 게시글 생성
  FinancialRecordArticle createFaRecArticle(FinancialRecordArticle faRecArticle);

  // 가계부 게시글 조회(단건)
  FinancialRecordArticle findFaRecArticle(Long faRecArticleId);
  // 가계부 게시글 조회(전체)
  List<FinancialRecordArticle> findFaRecArticles();
  // 가계부 게시글 수정
//  FinancialRecordArticle updateFaRecArticle(Long faRecArticleId, FinancialRecordArticle.Patch patchParam);
  // 가계부 게시글 삭제
  void deleteFaRecArticle(Long faRecArticleId);
}

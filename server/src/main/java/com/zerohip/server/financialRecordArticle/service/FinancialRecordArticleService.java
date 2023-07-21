package com.zerohip.server.financialRecordArticle.service;

import com.zerohip.server.financialRecordArticle.dto.FinancialRecordArticleDto;
import com.zerohip.server.financialRecordArticle.entity.FinancialRecordArticle;
import com.zerohip.server.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface FinancialRecordArticleService {
  // 가계부 게시글 생성
  FinancialRecordArticle createFaRecArticle(Long financialRecordId, User author, FinancialRecordArticle faRecArticle, List<MultipartFile> files);
  // 가계부 게시글 조회(단건)
  FinancialRecordArticle findFaRecArticle(Long faRecArticleId);
  // 가계부 게시글 조회(전체)
  Page<FinancialRecordArticle> findFaRecArticles(Long FaRecId, int page, int size);
  // 가계부 게시글 수정
  FinancialRecordArticle updateFaRecArticle(User author, Long faRecArticleId, FinancialRecordArticleDto.Patch patchParam, List<MultipartFile> files) throws IOException;
  // 가계부 게시글 삭제
  void deleteFaRecArticle(User author, Long faRecArticleId);
  // 가계부 게시글 조회 확인
  FinancialRecordArticle findVerifiedFaRecArticle(Long faRecArticleId);

  User findUser(User author);
}

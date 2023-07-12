package com.zerohip.server.financialRecordArticle.mapper;

import com.zerohip.server.financialRecordArticle.dto.FinancialRecordArticleDto;
import com.zerohip.server.financialRecordArticle.entity.FinancialRecordArticle;
import org.mapstruct.Mapper;

import javax.swing.*;

import java.util.List;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;
import static org.mapstruct.ReportingPolicy.IGNORE;

@Mapper(componentModel = SPRING, unmappedTargetPolicy = IGNORE)
public interface FinancialRecordArticleMapper {
  FinancialRecordArticle financialRecordArticlePostToFinancialRecordArticle(FinancialRecordArticleDto.Post requestbody);
  FinancialRecordArticle financialRecordArticlePatchToFinancialRecordArticle(FinancialRecordArticleDto.Patch requestbody);
  FinancialRecordArticleDto.Response financialRecordArticleToFinancialRecordArticleResponse(FinancialRecordArticle financialRecordArticle);
  List<FinancialRecordArticleDto.Response> financialRecordArticlesToFinancialRecordArticleResponses(List<FinancialRecordArticle> financialRecordArticles);
}

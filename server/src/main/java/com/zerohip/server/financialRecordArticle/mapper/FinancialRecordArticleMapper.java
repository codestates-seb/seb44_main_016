package com.zerohip.server.financialRecordArticle.mapper;

import com.zerohip.server.financialRecordArticle.dto.FinancialRecordArticleDto;
import com.zerohip.server.financialRecordArticle.entity.FinancialRecordArticle;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import javax.swing.*;

import java.util.List;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;
import static org.mapstruct.ReportingPolicy.IGNORE;

@Mapper(componentModel = SPRING, unmappedTargetPolicy = IGNORE)
public abstract class FinancialRecordArticleMapper {

  public abstract FinancialRecordArticle financialRecordArticlePostToFinancialRecordArticle(FinancialRecordArticleDto.Post requestbody);
  public abstract FinancialRecordArticle financialRecordArticlePatchToFinancialRecordArticle(FinancialRecordArticleDto.Patch requestbody);
  public abstract FinancialRecordArticleDto.Response financialRecordArticleToFinancialRecordArticleResponse(FinancialRecordArticle financialRecordArticle);
  public abstract List<FinancialRecordArticleDto.Response> financialRecordArticlesToFinancialRecordArticleResponses(List<FinancialRecordArticle> financialRecordArticles);

  @AfterMapping
  protected void mapFinancialRecordId(FinancialRecordArticle financialRecordArticle, @MappingTarget FinancialRecordArticleDto.Response response) {
    response.setFinancialRecordId(financialRecordArticle.getFinancialRecord().getFinancialRecordId());
  }
}

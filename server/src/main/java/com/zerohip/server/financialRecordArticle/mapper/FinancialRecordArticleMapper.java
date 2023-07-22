package com.zerohip.server.financialRecordArticle.mapper;

import com.zerohip.server.common.img.entity.Img;
import com.zerohip.server.financialRecordArticle.dto.FinancialRecordArticleDto;
import com.zerohip.server.financialRecordArticle.entity.FinancialRecordArticle;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import javax.swing.*;

import java.util.List;
import java.util.stream.Collectors;

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

  @AfterMapping
  protected void mapFilesPath(FinancialRecordArticle financialRecordArticle, @MappingTarget FinancialRecordArticleDto.Response response) {
    List<String> filePaths = financialRecordArticle.getImgList().stream()
            .map(Img::getFilePath)  // 가정: Img 엔티티에는 이미지 경로를 반환하는 getPath 메소드가 있다.
            .collect(Collectors.toList());
    response.setFilePath(filePaths);  // 가정: FinancialRecordArticleDto.Response에는 이미지 경로 리스트를 설정하는 setImgPath 메소드가 있다.
  }

}

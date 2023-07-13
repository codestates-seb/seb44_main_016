package com.zerohip.server.financialRecordArticle.mapper;

import com.zerohip.server.common.scope.Scope;
import com.zerohip.server.financialRecordArticle.dto.FinancialRecordArticleDto;
import com.zerohip.server.financialRecordArticle.entity.FinancialRecordArticle;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-13T10:54:58+0900",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.0.jar, environment: Java 17.0.7 (Amazon.com Inc.)"
)
@Component
public class FinancialRecordArticleMapperImpl implements FinancialRecordArticleMapper {

    @Override
    public FinancialRecordArticle financialRecordArticlePostToFinancialRecordArticle(FinancialRecordArticleDto.Post requestbody) {
        if ( requestbody == null ) {
            return null;
        }

        FinancialRecordArticle financialRecordArticle = new FinancialRecordArticle();

        financialRecordArticle.setTitle( requestbody.getTitle() );
        financialRecordArticle.setContent( requestbody.getContent() );
        financialRecordArticle.setFaDate( requestbody.getFaDate() );
        financialRecordArticle.setCategory( requestbody.getCategory() );
        financialRecordArticle.setPrice( requestbody.getPrice() );
        financialRecordArticle.setScope( requestbody.getScope() );

        return financialRecordArticle;
    }

    @Override
    public FinancialRecordArticle financialRecordArticlePatchToFinancialRecordArticle(FinancialRecordArticleDto.Patch requestbody) {
        if ( requestbody == null ) {
            return null;
        }

        FinancialRecordArticle financialRecordArticle = new FinancialRecordArticle();

        financialRecordArticle.setTitle( requestbody.getTitle() );
        financialRecordArticle.setContent( requestbody.getContent() );
        financialRecordArticle.setFaDate( requestbody.getFaDate() );
        financialRecordArticle.setCategory( requestbody.getCategory() );
        financialRecordArticle.setPrice( requestbody.getPrice() );
        financialRecordArticle.setScope( requestbody.getScope() );

        return financialRecordArticle;
    }

    @Override
    public FinancialRecordArticleDto.Response financialRecordArticleToFinancialRecordArticleResponse(FinancialRecordArticle financialRecordArticle) {
        if ( financialRecordArticle == null ) {
            return null;
        }

        Long financialRecordArticleId = null;
        String title = null;
        String content = null;
        Date faDate = null;
        String category = null;
        Integer price = null;
        Scope scope = null;
        LocalDateTime createdAt = null;
        LocalDateTime modifiedAt = null;

        financialRecordArticleId = financialRecordArticle.getFinancialRecordArticleId();
        title = financialRecordArticle.getTitle();
        content = financialRecordArticle.getContent();
        faDate = financialRecordArticle.getFaDate();
        category = financialRecordArticle.getCategory();
        price = financialRecordArticle.getPrice();
        scope = financialRecordArticle.getScope();
        createdAt = financialRecordArticle.getCreatedAt();
        modifiedAt = financialRecordArticle.getModifiedAt();

        Long financialRecordId = null;

        FinancialRecordArticleDto.Response response = new FinancialRecordArticleDto.Response( financialRecordArticleId, title, content, faDate, category, price, scope, createdAt, modifiedAt, financialRecordId );

        return response;
    }

    @Override
    public List<FinancialRecordArticleDto.Response> financialRecordArticlesToFinancialRecordArticleResponses(List<FinancialRecordArticle> financialRecordArticles) {
        if ( financialRecordArticles == null ) {
            return null;
        }

        List<FinancialRecordArticleDto.Response> list = new ArrayList<FinancialRecordArticleDto.Response>( financialRecordArticles.size() );
        for ( FinancialRecordArticle financialRecordArticle : financialRecordArticles ) {
            list.add( financialRecordArticleToFinancialRecordArticleResponse( financialRecordArticle ) );
        }

        return list;
    }
}

package com.zerohip.server.financialRecordArticle.mapper;

import com.zerohip.server.common.img.dto.ImgDto;
import com.zerohip.server.common.img.entity.Img;
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
    date = "2023-07-12T17:46:59+0900",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.1.1.jar, environment: Java 17.0.7 (Amazon.com Inc.)"
)
@Component
public class FinancialRecordArticleMapperImpl implements FinancialRecordArticleMapper {

    @Override
    public FinancialRecordArticle financialRecordArticlePostToFinancialRecordArticle(FinancialRecordArticle financialRecordArticle) {
        if ( financialRecordArticle == null ) {
            return null;
        }

        FinancialRecordArticle financialRecordArticle1 = new FinancialRecordArticle();

        financialRecordArticle1.setFinancialRecordArticleId( financialRecordArticle.getFinancialRecordArticleId() );
        financialRecordArticle1.setTitle( financialRecordArticle.getTitle() );
        financialRecordArticle1.setContent( financialRecordArticle.getContent() );
        financialRecordArticle1.setFaDate( financialRecordArticle.getFaDate() );
        financialRecordArticle1.setCategory( financialRecordArticle.getCategory() );
        financialRecordArticle1.setPrice( financialRecordArticle.getPrice() );
        financialRecordArticle1.setScope( financialRecordArticle.getScope() );
        financialRecordArticle1.setFinancialRecord( financialRecordArticle.getFinancialRecord() );
        List<Img> list = financialRecordArticle.getImgList();
        if ( list != null ) {
            financialRecordArticle1.setImgList( new ArrayList<Img>( list ) );
        }

        return financialRecordArticle1;
    }

    @Override
    public FinancialRecordArticle financialRecordArticlePatchToFinancialRecordArticle(FinancialRecordArticle financialRecordArticle) {
        if ( financialRecordArticle == null ) {
            return null;
        }

        FinancialRecordArticle financialRecordArticle1 = new FinancialRecordArticle();

        financialRecordArticle1.setFinancialRecordArticleId( financialRecordArticle.getFinancialRecordArticleId() );
        financialRecordArticle1.setTitle( financialRecordArticle.getTitle() );
        financialRecordArticle1.setContent( financialRecordArticle.getContent() );
        financialRecordArticle1.setFaDate( financialRecordArticle.getFaDate() );
        financialRecordArticle1.setCategory( financialRecordArticle.getCategory() );
        financialRecordArticle1.setPrice( financialRecordArticle.getPrice() );
        financialRecordArticle1.setScope( financialRecordArticle.getScope() );
        financialRecordArticle1.setFinancialRecord( financialRecordArticle.getFinancialRecord() );
        List<Img> list = financialRecordArticle.getImgList();
        if ( list != null ) {
            financialRecordArticle1.setImgList( new ArrayList<Img>( list ) );
        }

        return financialRecordArticle1;
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

        financialRecordArticleId = financialRecordArticle.getFinancialRecordArticleId();
        title = financialRecordArticle.getTitle();
        content = financialRecordArticle.getContent();
        faDate = financialRecordArticle.getFaDate();
        category = financialRecordArticle.getCategory();
        price = financialRecordArticle.getPrice();
        scope = financialRecordArticle.getScope();

        LocalDateTime createdAt = null;
        LocalDateTime modifiedAt = null;
        Long financialRecordId = null;
        List<ImgDto.Response> imgDtos = null;

        FinancialRecordArticleDto.Response response = new FinancialRecordArticleDto.Response( financialRecordArticleId, title, content, faDate, category, price, scope, createdAt, modifiedAt, financialRecordId, imgDtos );

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

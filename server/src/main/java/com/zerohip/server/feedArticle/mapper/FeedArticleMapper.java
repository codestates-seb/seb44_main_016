package com.zerohip.server.feedArticle.mapper;

import com.zerohip.server.feedArticle.dto.FeedArticleDto;
import com.zerohip.server.feedArticle.entity.FeedArticle;
import org.mapstruct.Mapper;

import javax.swing.*;
import java.util.List;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;
import static org.mapstruct.ReportingPolicy.IGNORE;

@Mapper(componentModel = SPRING, unmappedTargetPolicy = IGNORE)
public interface FeedArticleMapper {
    FeedArticle feedArticlePostToFeedArticle(FeedArticleDto.Post requestBody);
    FeedArticle feedArticlePatchToFeedArticle(FeedArticleDto.Patch requestBody);
    FeedArticleDto.FeedArticleResponse feedArticleToFeedArticleResponse(FeedArticle feedArticle);
    List<FeedArticleDto.FeedArticleResponse> feedArticlesToFeedArticleResponses(List<FeedArticle> feedArticles);
}

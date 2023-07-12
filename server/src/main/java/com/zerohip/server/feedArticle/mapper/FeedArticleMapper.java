package com.zerohip.server.feedArticle.mapper;

import com.zerohip.server.feedArticle.dto.FeedArticleDto;
import com.zerohip.server.feedArticle.entity.FeedArticle;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface FeedArticleMapper {
    FeedArticle feedArticlePostToFeedArticle(FeedArticleDto.post requestBody);
    FeedArticle feedArticlePatchToFeedArticle(FeedArticleDto.Patch requestBody);
    FeedArticleDto.FeedArticleResponse feedArticleToFeedArticleResponse(FeedArticle feedArticle);
    List<FeedArticleDto.FeedArticleListResponse> feedArticlesToFeedArticleResponses(List<FeedArticle> feedArticles);
}

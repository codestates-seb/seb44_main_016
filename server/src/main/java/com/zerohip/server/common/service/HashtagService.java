package com.zerohip.server.common.service;

import java.util.List;

public interface HashtagService {
    void addHashtagToFeedArticle(String feedArticleId, String Hashtag);
    void addHashtagToFinancialRecordArticle(String financialRecordArticleId, String hashtag);
    List<String> getHashtagsForFeedArticle(String feedArticleId);
    List<String> getHashtagsForFinancialRecordArticle(String financialRecordArticleId);
    void removeHashtagFromFeedArticle(String feedArticleId, String hashtag);
    void removeHashtagFromFinancialRecordArticle(String financialRecordArticleId, String hashtag);
}

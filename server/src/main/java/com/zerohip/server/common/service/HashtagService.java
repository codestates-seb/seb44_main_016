package com.zerohip.server.common.service;

import java.util.List;

public interface HashtagService {
    void addHashtagToFeedArticle(Long feedArticleId, String Hashtag);
    void addHashtagToFinancialRecordArticle(Long financialRecordArticleId, String hashtag);
    List<String> getHashtagsForFeedArticle(Long feedArticleId);
    List<String> getHashtagsForFinancialRecordArticle(Long financialRecordArticleId);
    void removeHashtagFromFeedArticle(Long feedArticleId, String hashtag);
    void removeHashtagFromFinancialRecordArticle(Long financialRecordArticleId, String hashtag);
}

package com.zerohip.server.common.service;

import java.util.List;

public interface HashtagService {
    void addHashtagToFeedArticle(Long feedArticleId, String Hashtag);
    void addHashtagToFinancialRecordArticle(Long faRecArticleId, String hashtag);
    List<String> getHashtagsForFeedArticle(Long feedArticleId);
    List<String> getHashtagsForFinancialRecordArticle(Long faRecArticleId);
    void removeHashtagFromFeedArticle(Long feedArticleId, String hashtag);
    void removeHashtagFromFinancialRecordArticle(Long faRecArticleId, String hashtag);
}

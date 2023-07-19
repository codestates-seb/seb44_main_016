package com.zerohip.server.common.vote.service;

import com.zerohip.server.common.voteType.VoteType;
import com.zerohip.server.user.entity.User;

public interface VoteService {
    void voteFeedArticle(Long feedArticleId, VoteType voteType, User user);
}

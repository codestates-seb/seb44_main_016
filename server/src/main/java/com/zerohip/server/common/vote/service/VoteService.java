package com.zerohip.server.common.vote.service;

import com.zerohip.server.common.vote.dto.VoteResponse;
import com.zerohip.server.common.voteType.VoteType;

import java.util.List;

public interface VoteService {
    void voteFeedArticle(Long articleId, VoteType voteType, String authorId);

    List<VoteResponse> getVotedByFeed(Long articleId, String authorId);
}

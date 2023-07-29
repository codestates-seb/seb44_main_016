package com.zerohip.server.common.vote.dto;

import com.zerohip.server.common.vote.entity.Vote;
import com.zerohip.server.common.voteType.VoteType;
import com.zerohip.server.user.entity.User;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class VoteResponse {
    private VoteType voteType;

    private User user;


    public static VoteResponse toResponse(Vote vote) {
        return VoteResponse.builder()
                .voteType(vote.getVoteType())
                .user(vote.getUser())
                .build();
    }
}

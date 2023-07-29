package com.zerohip.server.common.vote.service;

import com.zerohip.server.common.vote.dto.VoteResponse;
import com.zerohip.server.common.vote.entity.Vote;
import com.zerohip.server.common.vote.repository.VoteRepository;
import com.zerohip.server.common.voteType.VoteType;
import com.zerohip.server.feedArticle.entity.FeedArticle;
import com.zerohip.server.feedArticle.service.FeedArticleService;
import com.zerohip.server.user.entity.User;
import com.zerohip.server.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class VoteServiceImpl implements VoteService{
    private final FeedArticleService feedArticleService;
    private final VoteRepository voteRepository;
    private final UserService userService;
    private User user;

    public VoteServiceImpl(FeedArticleService feedArticleService, VoteRepository voteRepository, UserService userService) {
        this.feedArticleService = feedArticleService;
        this.voteRepository = voteRepository;
        this.userService = userService;
    }

    @Override
    public void voteFeedArticle(Long articleId, VoteType voteType, String authorId) {
        // 피드게시글 조회
        if(user == null) {
            user = userService.findUserByUserId(1L);
        }

        FeedArticle feedArticle = feedArticleService.findFeedArticle(articleId);
        if (feedArticle == null) {
            throw new EntityNotFoundException("존재하지 않는 피드 게시글 입니다.");
        }
        // 현재 로그인한 사용자 정보 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        try {
            user = (User) authentication.getPrincipal();
        } catch (Exception e) {
            user = userService.findUserByUserId(1L);
        }

        // 투표 처리
//        Vote vote = feedArticle.getVote();
        Vote vote = Vote.builder()
                .feedArticle(feedArticle)
                .user(user)
                .build();

        if (vote == null) {
            vote = Vote.builder()
                    .feedArticle(feedArticle)
                    .user(user)
                    .voteType(voteType)
                    .build();
        } else if (vote.getVoteType() == voteType) {
            vote.setVoteType(null); // 이미 해당 유형으로 투표한 경우 취소
        } else {
            vote.setVoteType(voteType); // 해당 유형으로 투표
        }
        log.info(vote.toString());
        voteRepository.save(vote); // 투표 엔티티를 저장
    }

    @Override
    public List<VoteResponse> getVotedByFeed(Long articleId, String authorId) {
        return getResponseList(
                voteRepository.findAllByFeedArticle_ArticleId(articleId)
        );
    }

    private List<VoteResponse> getResponseList(List<Vote> votes) {
        return votes.stream()
                .map(VoteResponse::toResponse)
                .collect(Collectors.toList());
    }
}

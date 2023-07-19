package com.zerohip.server.common.vote.service;

import com.zerohip.server.common.vote.entity.Vote;
import com.zerohip.server.common.vote.repository.VoteRepository;
import com.zerohip.server.common.voteType.VoteType;
import com.zerohip.server.feedArticle.entity.FeedArticle;
import com.zerohip.server.feedArticle.service.FeedArticleService;
import com.zerohip.server.user.entity.User;
import com.zerohip.server.user.service.UserService;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import javax.persistence.EntityNotFoundException;

@Service
public class VoteServiceImpl implements VoteService{
    private final FeedArticleService feedArticleService;
    private final VoteRepository voteRepository;
    private final UserService userService;
    private Object user;

    public VoteServiceImpl(FeedArticleService feedArticleService, VoteRepository voteRepository, UserService userService) {
        this.feedArticleService = feedArticleService;
        this.voteRepository = voteRepository;
        this.userService = userService;
    }

    @Override
    public void voteFeedArticle(Long feedArticleId, VoteType voteType, User user) {
        // 피드게시글 조회
        FeedArticle feedArticle = feedArticleService.findFeedArticle(feedArticleId);
        if (feedArticle == null) {
            throw new EntityNotFoundException("존재하지 않는 피드 게시글 입니다.");
        }
        // 현재 로그인한 사용자 정보 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        user = (User) authentication.getPrincipal();

        // 투표 처리
        Vote vote = feedArticle.getVote();
        if (vote == null) {
            vote = new Vote(feedArticle, user, voteType); // 처음 투표인 경우 생성
            vote.increaseVoteCount(); // 투표 수 증가
        } else if (vote.getVoteType() == voteType) {
            vote.setVoteType(null); // 이미 해당 유형으로 투표한 경우 취소
            vote.decreaseVoteCount(); // 투표 수 감소
        } else {
            vote.setVoteType(voteType); // 해당 유형으로 투표
        }

        voteRepository.save(vote); // 투표 엔티티를 저장
    }
}

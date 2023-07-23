package com.zerohip.server.feedArticle.service;

import com.zerohip.server.common.feedType.FeedType;
import com.zerohip.server.feedArticle.dto.FeedArticleDto;
import com.zerohip.server.feedArticle.entity.FeedArticle;
import com.zerohip.server.feedArticle.repository.FeedArticleRepository;
import com.zerohip.server.user.entity.User;
import com.zerohip.server.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
@Transactional
@RequiredArgsConstructor
public class FeedArticleServiceImpl implements FeedArticleService {
    private final FeedArticleRepository feedArticleRepository;
    private final UserService userService;

    //피드게시글 작성
    @Override
    public FeedArticle createFeedArticle(String author, FeedArticle feedArticle) {
        validateFeedArticle(feedArticle);
        return feedArticleRepository.save(feedArticle);
    }

    //피드게시글 작성 요청 시, 피드유형이 아닌 경우 예외 처리 -> 추후 예외처리된 게시글을 가계부게시글 서비스와 연결
    //다음 이슈처리 시 예외처리를 조금 더 세분화할 예정
    private void validateFeedArticle(FeedArticle feedArticle) {
        if (feedArticle.getFeedType() != FeedType.SAVING_TIP && feedArticle.getFeedType() != FeedType.PLEASE) {
            throw new IllegalArgumentException("가계부 게시글입니다");
        }
    }

    //피드 게시글 조회
    @Override
    public FeedArticle findFeedArticle(Long articleId) {
        return findVerifiedFeedArticle(articleId);
    }

    //피드 조회
    @Override
    public Page<FeedArticle> findFeedArticles(Long articleId, int page, int size) {
        return feedArticleRepository.findAll(PageRequest.of(page -1, size));
    }

    // 특정 사용자의 피드 게시글 조회
    @Override
    public Page<FeedArticle> findUserFeedArticles(Long userId, int page, int size) {
        User user = userService.findUserByUserId(userId);
        if (user == null) {
            throw new IllegalArgumentException("User not found with ID: " + userId);
        }

        return feedArticleRepository.findByUser(user, PageRequest.of(page - 1, size, Sort.by("createdAt").descending()));
    }

    //피드 게시글 수정
    @Override
    public FeedArticle updateFeedArticle(String author, Long articleId, FeedArticleDto.Patch patchParam) {
        FeedArticle findFeedArticle = findVerifiedFeedArticle(articleId);
        findFeedArticle.setContent(patchParam.getContent());
        findFeedArticle.setFeedType(patchParam.getFeedType());
        findFeedArticle.setScope(patchParam.getScope());

        FeedArticle updateFeedArticle = feedArticleRepository.save(findFeedArticle);
        return updateFeedArticle;
    }

    //피드 게시글 삭제
    @Override
    public void deleteFeedArticle(String author, Long articleId) {
        FeedArticle findFeedArticle = findVerifiedFeedArticle(articleId);
        feedArticleRepository.delete(findFeedArticle);
    }
    @Override
    public FeedArticle findVerifiedFeedArticle(Long articleId){
        Optional<FeedArticle> optionalFeedArticle = feedArticleRepository.findById(articleId);
        FeedArticle findFeedArticle = optionalFeedArticle.orElseThrow(() -> new RuntimeException("게시글이 존재하지 않습니다."));
        return findFeedArticle;
    }
}

package com.zerohip.server.feedArticle.service;

import com.zerohip.server.common.feedType.FeedType;
import com.zerohip.server.feedArticle.dto.FeedArticleDto;
import com.zerohip.server.feedArticle.entity.FeedArticle;
import com.zerohip.server.feedArticle.repository.FeedArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
@Transactional
@RequiredArgsConstructor
public class FeedArticleServiceImpl implements FeedArticleService {
    private final FeedArticleRepository feedArticleRepository;

    //피드게시글 작성
    @Override
    public FeedArticle createFeedArticle(FeedArticle feedArticle) {
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

    @Override
    public FeedArticle findVerifiedFeedArticle(Long feedArticleId){
    Optional<FeedArticle> optionalFeedArticle = feedArticleRepository.findById(feedArticleId);
    FeedArticle findFeedArticle = optionalFeedArticle.orElseThrow(() -> new RuntimeException("게시글이 존재하지 않습니다."));
    return findFeedArticle;
    }

    //피드 게시글 조회
    @Override
    public FeedArticle findFeedArticle(Long feedArticleId) {
        return findVerifiedFeedArticle(feedArticleId);
    }

    //피드 조회
    @Override
    public List<FeedArticle> findFeedArticles() {
        return feedArticleRepository.findAll();
    }

    @Override
    public FeedArticle updateFeedArticle(Long feedArticleId, FeedArticleDto.Patch patchParam) {
        FeedArticle findFeedArticle = findVerifiedFeedArticle(feedArticleId);
        findFeedArticle.setContent(patchParam.getContent());
        findFeedArticle.setFeedType((FeedType) patchParam.getFeedType());

        FeedArticle updateFeedArticle = feedArticleRepository.save(findFeedArticle);
        return updateFeedArticle;
    }

    //(현재 에러 때문에 메서드만 추가)
    @Override
    public void deleteFeedArticle(Long feedArticleId) {

    }
}

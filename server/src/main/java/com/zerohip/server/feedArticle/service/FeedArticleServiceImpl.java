package com.zerohip.server.feedArticle.service;

import com.zerohip.server.feedArticle.entity.FeedArticle;
import com.zerohip.server.feedArticle.repository.FeedArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Transactional
@RequiredArgsConstructor
public class FeedArticleServiceImpl implements FeedArticleService {
    private final FeedArticleRepository feedArticleRepository;

    //피드게시글 작성
    @Override
    public FeedArticle createFeedArticle(FeedArticle feedArticle) {
        return feedArticleRepository.save(feedArticle);
    }

    //수정, 조회, 삭제에 대한 로직 구성 시 내용 추가(현재 에러 때문에 메서드만 추가)
    @Override
    public FeedArticle findFeedArticle(Long feedArticleId) {
        return null;
    }

    @Override
    public List<FeedArticle> findFeedArticles() {
        return null;
    }

    @Override
    public void deleteFeedArticle(Long feedArticleId) {

    }
}

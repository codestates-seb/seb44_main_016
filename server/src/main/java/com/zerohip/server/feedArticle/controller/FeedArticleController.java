package com.zerohip.server.feedArticle.controller;

import com.zerohip.server.common.page.dto.MultiResponseDto;
import com.zerohip.server.feedArticle.dto.FeedArticleDto;
import com.zerohip.server.feedArticle.entity.FeedArticle;
import com.zerohip.server.feedArticle.mapper.FeedArticleMapper;
import com.zerohip.server.feedArticle.service.FeedArticleService;
import com.zerohip.server.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = {"/feedArticles", "/user/{user-id}/feedArticles"})
@Validated
@RequiredArgsConstructor
public class FeedArticleController {
    private final FeedArticleService feedArticleService;
    private final FeedArticleMapper feedArticleMapper;

    // 피드 게시글 생성
    @PostMapping
    public ResponseEntity createFeedArticle(@Valid @RequestBody FeedArticleDto.Post requestBody,
                                                         @AuthenticationPrincipal String authorId) {
        FeedArticle saveFeedArticle = feedArticleService.createFeedArticle(authorId, feedArticleMapper.feedArticlePostToFeedArticle(requestBody));
        URI uri = URI.create("/feedArticles/" + saveFeedArticle.getArticleId());
        log.info("saveFeedArticle.getCreatedAt() : {}", saveFeedArticle.getCreatedAt());
        return ResponseEntity.created(uri).body(feedArticleMapper.feedArticleToFeedArticleResponse(saveFeedArticle));
    }

    // 단일 피드 게시글 조회
    @GetMapping("/{ariticleId}")
    public ResponseEntity getFeedArticle(@PathVariable("articleId") Long articleId) {
        FeedArticle feedArticle = feedArticleService.findFeedArticle(articleId);
        if (feedArticle != null) {
            FeedArticleDto.FeedArticleResponse response = feedArticleMapper.feedArticleToFeedArticleResponse(feedArticle);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 피드 조회
    @GetMapping
    public ResponseEntity getAllFeedArticles(@Positive int page, @Positive int size) {
        Page<FeedArticle> pageFeedArticles = feedArticleService.findFeedArticles(page, size);
        List<FeedArticle> allFeedArticles = pageFeedArticles.getContent();
        return ResponseEntity.ok(feedArticleMapper.feedArticlesToFeedArticleResponses(allFeedArticles));
    }

    // 피드 게시글 수정
    @PatchMapping("/{articleId}")
    public ResponseEntity<FeedArticle> updateFeedArticle(@PathVariable("articleId") Long articleId,
                                                         @RequestBody FeedArticleDto.Patch requestbody,
                                                         @AuthenticationPrincipal String authorId) {
        FeedArticle feedArticle = feedArticleMapper.feedArticlePatchToFeedArticle(requestbody);
        FeedArticle updatedArticle = feedArticleService.updateFeedArticle(authorId, articleId, requestbody);
        if (updatedArticle != null) {
            FeedArticleDto.FeedArticleResponse response = feedArticleMapper.feedArticleToFeedArticleResponse(updatedArticle);
            return ResponseEntity.ok(updatedArticle);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 피드 게시글 삭제
    @DeleteMapping("/feedArticles/{articleId}")
    public ResponseEntity<Void> deleteFeedArticle(@PathVariable("articleId") Long articleId,
                                                  @AuthenticationPrincipal String authorId) {
        feedArticleService.deleteFeedArticle(authorId, articleId);
        return ResponseEntity.noContent().build();
    }

    // 특정 사용자의 피드 게시글 조회
    @GetMapping("/user/{userId}/feedArticles")
    public ResponseEntity getUserFeedArticles(@PathVariable("userId") Long userId,
                                              @RequestParam @Positive int page,
                                              @RequestParam @Positive int size) {
        Page<FeedArticle> pageUserFeedArticles = feedArticleService.findUserFeedArticles(userId, page, size);
        List<FeedArticleDto.FeedArticleResponse> userFeedArticles = feedArticleMapper.feedArticlesToFeedArticleResponses(pageUserFeedArticles.getContent());
        MultiResponseDto<FeedArticleDto.FeedArticleResponse> responseDto = new MultiResponseDto<>(userFeedArticles, pageUserFeedArticles);
        return ResponseEntity.ok(userFeedArticles);
    }

}
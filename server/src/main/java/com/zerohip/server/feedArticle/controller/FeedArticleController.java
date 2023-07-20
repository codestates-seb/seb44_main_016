package com.zerohip.server.feedArticle.controller;

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
@RequestMapping("/feedArticles")
@Validated
@RequiredArgsConstructor
public class FeedArticleController {
    private final FeedArticleService feedArticleService;
    private final FeedArticleMapper feedArticleMapper;

    // 피드 게시글 생성
    @PostMapping
    public ResponseEntity createFeedArticle(@Valid @RequestBody FeedArticleDto.Post requestBody,
                                                         @AuthenticationPrincipal User author) {
        FeedArticle saveFeedArticle = feedArticleService.createFeedArticle(author, feedArticleMapper.feedArticlePostToFeedArticle(requestBody));
        URI uri = URI.create("/feedArticles/" + saveFeedArticle.getArticleId());
        log.info("saveFeedArticle.getCreatedAt() : {}", saveFeedArticle.getCreatedAt());
        return ResponseEntity.created(uri).body(feedArticleMapper.feedArticleToFeedArticleResponse(saveFeedArticle));
    }

    // 단일 피드 게시글 조회
    @GetMapping("/{feedArticleId}")
    public ResponseEntity getFeedArticle(@PathVariable("feedArticleId") Long feedArticleId) {
        FeedArticle feedArticle = feedArticleService.findFeedArticle(feedArticleId);
        if (feedArticle != null) {
            FeedArticleDto.FeedArticleResponse response = feedArticleMapper.feedArticleToFeedArticleResponse(feedArticle);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 피드 조회
    @GetMapping()
    public ResponseEntity getAllFeedArticles(@Valid @RequestBody Long feedArticleId,
                                             @RequestParam @Positive int page,
                                             @RequestParam @Positive int size) {
        Page<FeedArticle> pageFeedArticles = feedArticleService.findFeedArticles(feedArticleId, page, size);
        List<FeedArticle> allFeedArticles = pageFeedArticles.getContent();
        return ResponseEntity.ok(feedArticleMapper.feedArticlesToFeedArticleResponses(allFeedArticles));
    }

    // 피드 게시글 수정
    @PatchMapping("/{feedArticleId}")
    public ResponseEntity<FeedArticle> updateFeedArticle(@PathVariable("feedArticleId") Long feedArticleId,
                                                         @RequestBody FeedArticleDto.Patch requestbody,
                                                         @AuthenticationPrincipal User author) {
        FeedArticle feedArticle = feedArticleMapper.feedArticlePatchToFeedArticle(requestbody);
        FeedArticle updatedArticle = feedArticleService.updateFeedArticle(author, feedArticleId, requestbody);
        if (updatedArticle != null) {
            FeedArticleDto.FeedArticleResponse response = feedArticleMapper.feedArticleToFeedArticleResponse(updatedArticle);
            return ResponseEntity.ok(updatedArticle);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 피드 게시글 삭제
    @DeleteMapping("/{feedArticleId}")
    public ResponseEntity<Void> deleteFeedArticle(@PathVariable("feedArticleId") Long feedArticleId,
                                                  @AuthenticationPrincipal User author) {
        feedArticleService.deleteFeedArticle(author, feedArticleId);
        return ResponseEntity.noContent().build();
    }
}
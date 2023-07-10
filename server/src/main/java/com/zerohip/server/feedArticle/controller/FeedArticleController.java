package com.zerohip.server.feedArticle.controller;

import com.zerohip.server.feedArticle.dto.FeedArticleDto;
import com.zerohip.server.feedArticle.entity.FeedArticle;
import com.zerohip.server.feedArticle.service.FeedArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feedArticles")
@Validated
@RequiredArgsConstructor
public class FeedArticleController {
    private final FeedArticleService feedArticleService;

    // 피드 게시글 생성
    @PostMapping()
    public ResponseEntity<FeedArticle> createFeedArticle(@RequestBody FeedArticle feedArticle) {
        FeedArticle createdArticle = feedArticleService.createFeedArticle(feedArticle);
        return ResponseEntity.ok(createdArticle);
    }

    // 피드 게시글 조회(단건)
    @GetMapping("/{feedArticleId}")
    public ResponseEntity<FeedArticle> getFeedArticle(@PathVariable("feedArticleId") Long feedArticleId) {
        FeedArticle feedArticle = feedArticleService.findFeedArticle(feedArticleId);
        if (feedArticle != null) {
            return ResponseEntity.ok(feedArticle);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 피드 조회
    @GetMapping()
    public ResponseEntity<List<FeedArticle>> getAllFeedArticles() {
        List<FeedArticle> feedArticles = feedArticleService.findFeedArticles();
        return ResponseEntity.ok(feedArticles);
    }

    // 피드 게시글 수정
    @PatchMapping("/{feedArticleId}")
    public ResponseEntity<FeedArticle> updateFeedArticle(
            @PathVariable("feedArticleId") Long feedArticleId,
            @RequestBody FeedArticleDto.Patch patchParam) {
        FeedArticle updatedArticle = feedArticleService.updateFeedArticle(feedArticleId, patchParam);
        if (updatedArticle != null) {
            return ResponseEntity.ok(updatedArticle);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 피드 게시글 삭제
    @DeleteMapping("/{feedArticleId}")
    public ResponseEntity<Void> deleteFeedArticle(@PathVariable("feedArticleId") Long feedArticleId) {
        feedArticleService.deleteFeedArticle(feedArticleId);
        return ResponseEntity.noContent().build();
    }
}
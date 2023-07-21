package com.zerohip.server.like.controller;

import com.zerohip.server.like.dto.LikeRequest;
import com.zerohip.server.like.service.LikeService;
import com.zerohip.server.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/like")
public class LikeController {

    private final LikeService likeService;

    @GetMapping("/financial-record-article/{id}")
    public ResponseEntity<Long> getLikesCountForFinancialRecordArticle(@PathVariable Long id) {
        return ResponseEntity.ok(likeService.getLikesCountForFinancialRecordArticle(id));
    }

//    @GetMapping("/comment/{id}")
//    public ResponseEntity<Long> getLikesCountForComment(@PathVariable Long id) {
//        return ResponseEntity.ok(likeService.getLikesCountForComment(id));
//    }

    @PostMapping
    public ResponseEntity createLike(@RequestBody @Valid LikeRequest likeRequest, @AuthenticationPrincipal User author) {
        likeService.createLike(likeRequest, author);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/financial-record-article")
    public ResponseEntity deleteFinancialRecordArticleLike(@RequestBody @Valid LikeRequest likeRequest, @AuthenticationPrincipal User author) {
        likeService.deleteFinancialRecordArticleLike(likeRequest, author);

        return ResponseEntity.noContent().build();
    }
}

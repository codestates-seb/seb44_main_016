package com.zerohip.server.common.vote.controller;

import com.zerohip.server.common.exception.BusinessLogicException;
import com.zerohip.server.common.vote.dto.VoteResponse;
import com.zerohip.server.common.vote.service.VoteService;
import com.zerohip.server.common.voteType.VoteType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/vote")
public class VoteController {
    private final VoteService voteService;

    public VoteController(VoteService voteService) {
        this.voteService = voteService;
    }

    @PostMapping("/{articleId}")
    public ResponseEntity<String> voteFeedArticle(
            @PathVariable Long articleId,
            @RequestParam VoteType voteType,
            @AuthenticationPrincipal String authorId
    ) {

        try {
            voteService.voteFeedArticle(articleId, voteType, authorId);
            return ResponseEntity.ok("투표가 성공적으로 처리되었습니다.");
        } catch (BusinessLogicException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("오류가 발생했습니다.");
        }
    }

    @GetMapping("/{articleId}")
    public ResponseEntity<List<VoteResponse>> getVotedByFeedArticle(
            @PathVariable Long articleId,
            @AuthenticationPrincipal String authorId
    ) {
        return ResponseEntity.ok(voteService.getVotedByFeedArticle(
                articleId,
                authorId
        ));
    }


}

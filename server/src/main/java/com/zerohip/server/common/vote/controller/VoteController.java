package com.zerohip.server.common.vote.controller;

import com.zerohip.server.common.exception.BusinessLogicException;
import com.zerohip.server.common.vote.service.VoteService;
import com.zerohip.server.common.voteType.VoteType;
import com.zerohip.server.user.entity.User;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/feedArticles")
public class VoteController {
    private final VoteService voteService;

    public VoteController(VoteService voteService) {
        this.voteService = voteService;
    }

    @PostMapping("/{feedArticled}/vote")
    public ResponseEntity<String> voteFeedArticle(
            @PathVariable Long feedArticleId,
            @RequestParam VoteType voteType,
            @AuthenticationPrincipal User user
    ) {
        try {
            voteService.voteFeedArticle(feedArticleId, voteType, user);
            return ResponseEntity.ok("투표가 성공적으로 처리되었습니다.");
        } catch (BusinessLogicException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("오류가 발생했습니다.");
        }
    }
}

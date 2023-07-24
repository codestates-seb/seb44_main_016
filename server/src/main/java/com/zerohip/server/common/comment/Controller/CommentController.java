package com.zerohip.server.common.comment.Controller;

import com.zerohip.server.common.comment.dto.CommentDto;
import com.zerohip.server.common.comment.entity.Comment;
import com.zerohip.server.common.comment.mapper.CommentMapper;
import com.zerohip.server.common.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/financial-record/{article-id}/article/{article-id}/comment, /feedArticles/{article-id}/comment")
public class CommentController {

  private final CommentService service;
  private final CommentMapper mapper;

  @PostMapping
  public ResponseEntity createComment(@Valid @RequestBody CommentDto.Post data,
                                      @PathVariable("article-id") Long articleId,
                                      @AuthenticationPrincipal String authorId) {
    Comment savedComment = service.createComment(authorId, articleId, mapper.commentPostToComment(data));
    return ResponseEntity.ok(mapper.commentToCommentResponse(savedComment));
  }

  @GetMapping("/{comment-id}")
  public ResponseEntity getComment(@PathVariable("article-id") Long articleId,
                                   @PathVariable("comment-id") Long commentId) {
    Comment verifiedComment = service.findComment(articleId, commentId);
    return ResponseEntity.ok(mapper.commentToCommentResponse(verifiedComment));
  }

  @GetMapping
  public ResponseEntity getComments(@PathVariable("article-id") Long articleId,
                                    @RequestParam(value = "page", defaultValue = "1") int page,
                                    @RequestParam(value = "size", defaultValue = "20") int size) {
    Page<Comment> pageComments = service.findComments(articleId, page, size);
    List<Comment> allComments = pageComments.getContent();
    return ResponseEntity.ok(mapper.commentsToCommentResponses(allComments));
  }

  @PatchMapping("/{comment-id}")
  public ResponseEntity updateComment(@Valid @RequestBody CommentDto.Patch data,
                                      @PathVariable("article-id") Long articleId,
                                      @PathVariable("comment-id") Long commentId,
                                      @AuthenticationPrincipal String authorId) {
    Comment updatedComment = service.updateComment(authorId, articleId, commentId, data);

    return ResponseEntity.ok(mapper.commentToCommentResponse(updatedComment));
  }

  @DeleteMapping("/{comment-id}")
  public Response
}

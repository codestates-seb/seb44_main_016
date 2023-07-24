package com.zerohip.server.common.comment.service;

import com.zerohip.server.common.comment.dto.CommentDto;
import com.zerohip.server.common.comment.entity.Comment;
import org.springframework.data.domain.Page;

public interface CommentService {
  Comment createComment(String authorId, Long articleId, Comment comment);

  Comment findComment(Long articleId, Long commentId);

  Page<Comment> findComments(Long articleId, int page, int size);

  Comment updateComment(String authorId, Long aritlceId, Long commentId, CommentDto.Patch patchParam);

  void deleteComment(String authorId, Long aritlceId, Long commentId);

  Comment findVerifiedComment(Long commentId);
}

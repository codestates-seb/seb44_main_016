package com.zerohip.server.common.comment.service;

import com.zerohip.server.common.comment.dto.CommentDto;
import com.zerohip.server.common.comment.entity.Comment;
import org.springframework.data.domain.Page;

public interface CommentService {
  Comment createComment(Comment comment);

  Comment findComment(Long commentId);

  Page<Comment> findComments(int page, int size);

  Comment updateComment(Long commentId, CommentDto.Patch patchParam);

  void deleteComment(Long commentId);

  Comment findVerifiedComment(Long commentId);
}

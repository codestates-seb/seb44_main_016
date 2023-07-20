package com.zerohip.server.common.comment.service;

import com.zerohip.server.common.comment.dto.CommentDto;
import com.zerohip.server.common.comment.entity.Comment;
import com.zerohip.server.common.comment.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

  private final CommentRepository repository;

  @Override
  public Comment createComment(Comment postParam) {
    return repository.save(postParam);
  }

  @Override
  public Comment findComment(Long commentId) {
    return findVerifiedComment(commentId);
  }

  @Override
  public Page<Comment> findComments(int page, int size) {
    return repository.findAll(PageRequest.of(page -1, size, Sort.by("commentId").descending()));
  }

  @Override
  public Comment updateComment(Long commentId, CommentDto.Patch patchParam) {
    Comment findComment = findVerifiedComment(commentId);
    findComment.setContent(patchParam.getContent());

    Comment updateComment = repository.save(findComment);
    return updateComment;
  }

  @Override
  public void deleteComment(Long commentId) {
    Comment findComment = findVerifiedComment(commentId);
    repository.delete(findComment);
  }

  @Override
  public Comment findVerifiedComment(Long commentId) {
    Optional<Comment> optionalComment = repository.findById(commentId);
    Comment findComment = optionalComment.orElseThrow(() -> new RuntimeException("존재하지 않는 댓글입니다."));
    return findComment;
  }
}

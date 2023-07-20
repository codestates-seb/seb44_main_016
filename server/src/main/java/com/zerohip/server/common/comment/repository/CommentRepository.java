package com.zerohip.server.common.comment.repository;

import com.zerohip.server.common.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}

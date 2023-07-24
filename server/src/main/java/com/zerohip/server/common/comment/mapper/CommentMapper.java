package com.zerohip.server.common.comment.mapper;

import com.zerohip.server.common.comment.dto.CommentDto;
import com.zerohip.server.common.comment.entity.Comment;
import org.mapstruct.Mapper;

import javax.swing.*;

import java.util.List;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;
import static org.mapstruct.ReportingPolicy.IGNORE;

@Mapper(componentModel = SPRING, unmappedTargetPolicy = IGNORE)
public abstract class CommentMapper {

  public abstract Comment commentPostToComment(CommentDto.Post data);
  public abstract Comment commentPatchToComment(CommentDto.Patch data);
  public abstract CommentDto.Response commentToCommentResponse(Comment comment);
  public abstract List<CommentDto.Response> commentsToCommentResponses(List<Comment> comments);
}

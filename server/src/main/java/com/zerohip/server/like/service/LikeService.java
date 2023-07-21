package com.zerohip.server.like.service;

import com.zerohip.server.common.comment.repository.CommentRepository;
import com.zerohip.server.feedArticle.repository.FeedArticleRepository;
import com.zerohip.server.financialRecordArticle.entity.FinancialRecordArticle;
import com.zerohip.server.financialRecordArticle.repository.FinancialRecordArticleRepository;
import com.zerohip.server.like.dto.LikeRequest;
import com.zerohip.server.like.repository.LikeRepository;
import com.zerohip.server.user.entity.User;
import com.zerohip.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;

@RequiredArgsConstructor
@Service
public class LikeService {
    private final LikeRepository likeRepository;
    private final UserRepository userRepository;
    private final FeedArticleRepository feedArticleRepository;
    private final FinancialRecordArticleRepository financialRecordArticleRepository;
    private final CommentRepository commentRepository;


    /*
    author이 null인 경우
     */
    @Transactional
    public void createLike(LikeRequest likeRequest, User author) {

        if(author == null) {
            author = userRepository.findById(likeRequest.getUserId()).get();
        }
        FinancialRecordArticle validFinancialRecordArticle = null;
        if (likeRequest.getFinancialRecordArticleId() != null) {
            Long count = likeRepository.countByUser_UserIdAndFinancialRecordArticle_ArticleId(
                    author.getUserId(), likeRequest.getFinancialRecordArticleId());
            if (count != 0L) {
                throw new IllegalArgumentException("User has already liked this FinancialRecordArticle");
            }
            validFinancialRecordArticle = financialRecordArticleRepository.findById(likeRequest.getFinancialRecordArticleId())
                    .orElseThrow(() -> new EntityNotFoundException("FinancialRecordArticle not found"));
        }


        likeRepository.save(
                likeRequest.toEntity(
                        author == null
                                ? userRepository.findById(likeRequest.getUserId()).orElseThrow(() -> new EntityNotFoundException("User not found"))
                                : author,
                        likeRequest.getFeedArticleId() != null ? feedArticleRepository.findById(likeRequest.getFeedArticleId()).orElseThrow(() -> new EntityNotFoundException("FeedArticle not found")) : null,
                        likeRequest.getFinancialRecordArticleId() != null && validFinancialRecordArticle != null ? validFinancialRecordArticle : null,
                        likeRequest.getCommentId() != null ? commentRepository.findById(likeRequest.getCommentId()).orElseThrow(() -> new EntityNotFoundException("Comment not found")) : null
                )
        );
    }

    @Transactional
    public void deleteFinancialRecordArticleLike(LikeRequest likeRequest, User author) {
        if(author == null) {
            author = userRepository.findById(likeRequest.getUserId()).get();
        }

        likeRepository.deleteByUser_UserIdAndFinancialRecordArticle_ArticleId(author.getUserId(), likeRequest.getFinancialRecordArticleId());
    }

    @Transactional
    public Long getLikesCountForFinancialRecordArticle(Long financialRecordArticleId) {


        return likeRepository.countByFinancialRecordArticle_ArticleId(financialRecordArticleId);
    }
}

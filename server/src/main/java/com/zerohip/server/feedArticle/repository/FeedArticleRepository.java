package com.zerohip.server.feedArticle.repository;

import com.zerohip.server.feedArticle.entity.FeedArticle;
import com.zerohip.server.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedArticleRepository extends JpaRepository<FeedArticle, Long> {
    Page<FeedArticle> findByUser(User user, PageRequest createdAt);
}

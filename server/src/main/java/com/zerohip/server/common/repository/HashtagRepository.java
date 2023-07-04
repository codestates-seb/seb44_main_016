package com.zerohip.server.common.repository;

import com.zerohip.server.common.entity.Hashtag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HashtagRepository extends JpaRepository <Hashtag, Long>{

    //피드게시글에 있는 해시태그 조회
    List<Hashtag> findByFeedArticleId(Long feedArticleId);

    //가계부게시글에 있는 해시태그 조회
    List<Hashtag> findByFaRecArticleId(Long faRecArticleId);

    //피드게시글 해시태그 추가
    void addHashtagsToFeedArticle(Long feedArticleId, List<Hashtag> hashtags);

    //가계부게시글 해시태그 추가
    void addHashtagsToFaRecArticle(Long faRecArticleId, List<Hashtag> hashtags);

    //해시태그 삭제
    void deleteHashtag(Long hashtagId);
}

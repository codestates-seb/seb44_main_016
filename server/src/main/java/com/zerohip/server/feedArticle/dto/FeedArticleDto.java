package com.zerohip.server.feedArticle.dto;


import com.zerohip.server.common.audit.Auditable;
import com.zerohip.server.common.feedType.FeedType;
import com.zerohip.server.feedArticle.entity.FeedArticle;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

public class FeedArticleDto {

    @Getter
    @AllArgsConstructor
    public static class post{
        @NotBlank
        @Size(max = 10000)
        private String content;
        @NotNull
        private FeedType feedType;

        //이미지, 댓글, 해시태그, 투표(절약/플렉스) 추가
    }

    //단일 피드게시글 조회
    @Getter
    @AllArgsConstructor
    public static class FeedArticleResponse {
        private Long feedArticleId;
        @NotNull
        @Size(max = 10000)
        private String content;
        @NotNull
        private FeedType feedType;
        //조회 부분은 클라이언트의 요청을 받기 때문에 생성,수정 시간 명시
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;

        //이미지, 댓글, 유저(userId, profileImgPath, nickName), 투표
    }

    //전체 피드게시글 죄회 - 피드 게시글의 정보를 리스트로 담아서 조회
    @Getter
    @AllArgsConstructor
    public static class FeedArticleListResponse {
        private List<FeedArticle> feedArticles;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {
        @NotBlank
        @Size(max = 10000)
        private String content;
        @NotNull
        private FeedType feedType;

        //이미지, 해시태그 추가
    }
}

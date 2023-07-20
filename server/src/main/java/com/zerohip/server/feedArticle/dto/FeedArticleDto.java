package com.zerohip.server.feedArticle.dto;


import com.zerohip.server.common.audit.Auditable;
import com.zerohip.server.common.feedType.FeedType;
import com.zerohip.server.common.scope.Scope;
import com.zerohip.server.feedArticle.entity.FeedArticle;
import com.zerohip.server.user.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.domain.Page;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

public class FeedArticleDto {

    @Getter
    @AllArgsConstructor
    public static class Post{
        @NotNull
        private Scope scope;
        @NotBlank
        @Size(max = 2000)
        private String content;
        @NotNull
        private FeedType feedType;

        //이미지, 댓글, 해시태그, 투표(절약/플렉스) 추가
    }

    //단일 피드게시글 조회
    @Getter
    @AllArgsConstructor
    public static class FeedArticleResponse {
        private UserDto.Response user;
        private Long feedArticleId;
        private Scope scope;
        private String content;
        private FeedType feedType;
        //조회 부분은 클라이언트의 요청을 받기 때문에 생성,수정 시간 명시
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;

        //이미지, 댓글, 투표
    }

    //전체 피드게시글 죄회 - 피드 게시글의 정보를 리스트로 담아서 조회
    @Getter
    @AllArgsConstructor
    public static class FeedArticlePageResponse {
        private Page<FeedArticle> feedArticles;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {
        @NotNull
        private Scope scope;
        @NotBlank
        @Size(max = 2000)
        private String content;
        @NotNull
        private FeedType feedType;

        //이미지, 해시태그 추가
    }
}

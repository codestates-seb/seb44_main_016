package com.zerohip.server.feedArticle.dto;


import com.zerohip.server.common.audit.Auditable;
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
        //@Size(max = 추후 지정) -> @NotBlank와 함께 사용하면 조금 더 정확할 것 같음.
        //@Size(min = 1, max = ???)를 사용하면 @NotBlank는 없어도 될 것 같기도.. 고민 필요
        private String content;
        @NotNull
        private Enum feedType;

        //이미지, 댓글, 해시태그, 투표(절약/플렉스) 추가
    }

    //단일 피드게시글 조회
    @Getter
    @AllArgsConstructor
    public class FeedArticleResponse extends Auditable {
        private Long feedArticleId;
        @NotNull
        //@Size(max = 추후 지정) -> @NotBlank와 함께 사용하면 조금 더 정확할 것 같음.
        //@Size(min = 1, max = ???)를 사용하면 @NotBlank는 없어도 될 것 같기도.. 고민 필요
        private String content;
        @NotNull
        private Enum feedType;
        //조회 부분은 클라이언트의 요청을 받기 때문에 생성,수정 시간 명시
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;

        //이미지, 댓글, 해시태그, 유저, 투표, 유저Id
    }

    //전체 피드게시글 죄회 - 피드 게시글의 정보를 리스트로 담아서 조회
    @Getter
    @AllArgsConstructor
    public class FeedArticleListResponse {
        private List<FeedArticle> feedArticles;
    }
}

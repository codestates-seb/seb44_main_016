package com.zerohip.server.feedArticle.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class FeedArticleDto {

    @Getter
    @AllArgsConstructor
    public static class post{
        @NotBlank
        private String content;
        @NotNull
        private Enum feedType;

        //이미지, 댓글, 해시태그, 투표(절약/플렉스) 추가 필요
    }
}

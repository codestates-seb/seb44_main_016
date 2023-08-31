package com.zerohip.server.follow.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class FollowDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class FollowResponseDto {

        private Long followId;
        private Long followerId;
        private Long followingId;

    }


    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class FollowerResponseDto {

        private Long followId;
        private Long followerId;
        private String email;
        private String loginId;
        private String nickname;
        private String profileImgPath;

        // private boolean followed 추가 예정
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class FollowingResponseDto {

        private Long followId;
        private Long followingId;
        private String email;
        private String loginId;
        private String nickname;
        private String profileImgPath;

    }
}

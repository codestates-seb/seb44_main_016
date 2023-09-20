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
//        private Boolean isFollowing; // 해당 유저가 다른 사용자 팔로잉


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
        private Boolean isFollow;

    }


    // 추후 맞팔 여부로 변경
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CheckFollowResponseDto {

        private Long followId;
        private Long followerId;
        private Long followingId;
        private Boolean isFollow;


    }
}

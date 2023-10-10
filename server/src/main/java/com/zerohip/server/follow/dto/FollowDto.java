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
        private String followerId;
        private String followingId;
        private Boolean isFollowing; // 해당 유저가 다른 사용자 팔로잉
        private Boolean isFollowed; //

    }


    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class FollowerResponseDto {

        private Long followId;
        private String followerId;
        private String email;
        private String nickname;
        private String profileImgPath;
        private Boolean isFollowing;
        private Boolean isFollowed;


    }


    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class FollowingResponseDto {

        private Long followId;
        private String followingId;
        private String email;
        private String nickname;
        private String profileImgPath;
        private Boolean isFollowing;
        private Boolean isFollowed;

    }


    // 추후 맞팔 여부 확인에 사용
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CheckFriendResponseDto {

        private Long followId;
        private String followerId;
        private String followingId;
        private Boolean isFollowing;
        private Boolean isFriend;

    }
}

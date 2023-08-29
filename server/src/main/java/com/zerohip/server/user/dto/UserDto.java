package com.zerohip.server.user.dto;

import com.zerohip.server.follow.dto.FollowDto;
import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

public class UserDto {

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Login {

        private String loginId;
        private String password;
    }


    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Post {

        @NotBlank(message = "이메일은 공백이 아니어야 합니다.")
        @Email(message = "올바른 이메일 형식을 입력하세요.")
        private String email;

        @NotBlank(message = "아이디는 공백이 아니어야 합니다.")
        @Pattern(regexp = "^[a-zA-Z0-9]*$", message = "아이디는 영문 대소문자와 숫자만 가능합니다.")
        @Size(min = 4, max = 10, message = "아이디는 4 ~ 10자 사이여야 합니다.")
        private String loginId;

        @NotBlank(message = "패스워드는 공백이 아니여야 합니다.")
        @Pattern(regexp = "^(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*()])[a-z0-9!@#$%^&*()]+$",
                message = "비밀번호는 영문 소문자와 숫자, 키패드 1~0까지의 특수문자만 가능하며 각각 한 글자 이상이 포함되어야 합니다.")
        @Size(min = 8, max = 16, message = "비밀번호는 8~16자 사이여야 합니다.")
        private String password;

        @NotBlank(message = "닉네임은 공백이 아니어야 합니다.")
        @Pattern(regexp = "^[\\uAC00-\\uD7AF\\u1100-\\u11FF\\u3130-\\u318F\\uA960-\\uA97F\\uAC00-\\uD7A3a-zA-Z0-9]*$", message = "닉네임은 영문 대소문자와 한글, 숫자만 가능합니다.")
        @Size(min = 4, max = 10, message = "닉네임은 4 ~ 10자 사이여야 합니다.")
        private String nickname;

        @NotBlank
        private String profileImgPath;

    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Patch {

        private String loginId;

        @Pattern(regexp = "^[a-zA-Z0-9!@#$%^&*()]*$", message = "비밀번호는 영문 대소문자와 키패드 1~0까지의 특수문자만 가능합니다.")
        @Size(min = 8, max = 16, message = "비밀번호는 8~16자 사이여야 합니다.")
        private String password;

        @Pattern(regexp = "^[\\uAC00-\\uD7AF\\u1100-\\u11FF\\u3130-\\u318F\\uA960-\\uA97F\\uAC00-\\uD7A3a-zA-Z0-9]*$", message = "닉네임은 영문 대소문자와 한글, 숫자만 가능합니다.")
        @Size(min = 4, max = 10, message = "닉네임은 4 ~ 10자 사이여야 합니다.")
        private String nickname;

        private String profileImgPath;



        // private 이미지 userImage

    }


    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class CheckLoginId {

        private String loginId;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class CheckEmail {

        private String email;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CheckPassword {

        private String password;
    }


//    @Getter
//    @AllArgsConstructor
//    @NoArgsConstructor
//    @Builder
//    public static class CheckLoginIdResponse {
//
//        private String
//    }



    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {

        private Long userId;
        private String email;
        private String loginId;
        private String nickname;
        private String profileImgPath;
        private String provider;
        private LocalDateTime createdAt;

        // 매핑 후 추가
        // 작성한 faRec, faRecBoard, article 수
        // flex, 절약버튼 총 수량도 ?

    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PatchResponse {

        private Long userId;
        private String email;
        private String loginId;
        private String password;
        private String nickname;
        private String profileImgPath;
        private LocalDateTime modifiedAt;

    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MyPageResponse {

        private Long userId;
        private String email;
        private String loginId;
        private String password;
        private String nickname;
        private String profileImgPath;
        private List<FollowDto.FollowingResponseDto> followingList;
        private List<FollowDto.FollowerResponseDto> followerList;

    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class CheckPasswordResponse {
        private Boolean passwordCheck;

        public void setCheck(Boolean passwordCheck) {
            this.passwordCheck = passwordCheck;
        }
    }
}
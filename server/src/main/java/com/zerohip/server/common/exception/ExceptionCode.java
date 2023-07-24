package com.zerohip.server.common.exception;

import lombok.Getter;

@Getter
public enum ExceptionCode {

    // USER
    USER_NOT_FOUND(404, 1001,"사용자를 찾을 수 없습니다."),
    USER_EXISTS(409, 1002, "이미 존재하는 사용자입니다."),
    USER_LOGIN_ID_EXISTS(409, 1003, "이미 존재하는 아이디 입니다."),
    USER_EMAIL_EXISTS(409, 1004, "이미 존재하는 Email 입니다."),
    FFFFFFFFF_fFFFFFFFFF(409, 1005, "FFFFFFFFFFFFFFFFF"),

    // 인증 & 인가
    AUTHOR_UNAUTHORIZED(403, 5000, "인증된 사용자 정보를 찾을 수 없습니다."),
    USER_UNAUTHORIZED(403, 5001, "인증되지 않은 사용자입니다."),
    EMAIL_EXISTS(409,5002, "중복된 이메일입니다."),
    LoginId_EXISTS(409,5003, "중복된 ID 입니다."),
    PASSWORD_MISMATCH(409,5004, "비밀번호가 일치하지 않습니다.");










    private final int status;
    private final int customCode;
    private final String message;

    ExceptionCode(int code, int domainErrorCode, String message) {
        this.status = code;
        this.customCode = domainErrorCode;
        this.message = message;
    }
}
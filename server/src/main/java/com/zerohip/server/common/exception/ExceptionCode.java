package com.zerohip.server.common.exception;

import lombok.Getter;

@Getter
public enum ExceptionCode {

    USER_NOT_FOUND(404, 1001,"사용자를 찾을 수 없습니다."),
    USER_EXISTS(409, 1002, "이미 존재하는 사용자입니다."),
    USER_UNAUTHORIZED(403, 1003, "인증되지 않은 사용자입니다."),


    FinancialRecord_Not_FOUND(404, 2001, "가계부를 찾을 수 없습니다.");








    private final int status;
    private final int customCode;
    private final String message;

    ExceptionCode(int code, int domainErrorCode, String message) {
        this.status = code;
        this.customCode = domainErrorCode;
        this.message = message;
    }
}
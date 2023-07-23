package com.zerohip.server.security.handler;

import com.google.gson.Gson;
import com.zerohip.server.common.response.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class UserAuthenticationFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request,
                                        HttpServletResponse response,
                                        AuthenticationException exception) throws IOException {

        log.error("# Authentication failed: {}", exception.getMessage());

        /** java 17 switch 식 사용
         *
         * 문제점 ..
         * 1. error 클래스 명 하드 코딩
         *   -> switch 식에서 패턴매칭을 위해선 문자열 리터럴로만 사용가능
         *      따라서, 객체의 클래스를 사용할 경우 하드코딩 필요
         */
        String errorMessage = switch (exception.getClass().getSimpleName()) {

            case "BadCredentialsException", "InternalAuthenticationServiceException"
                -> LoginErrorMessage.BAD_CREDENTIALS.getMessage();
            case "UsernameNotFoundException"
                -> LoginErrorMessage.USER_ACCOUNT_NOT_FOUND.getMessage();
            case "AuthenticationCredentialsNotFoundException"
                -> LoginErrorMessage.AUTHENTICATION_CREDENTIALS_NOT_FOUND.getMessage();

            default -> LoginErrorMessage.UNKNOWN_FAILURE.getMessage();

        };

        sendErrorResponse(response, errorMessage);
    }

    private void sendErrorResponse(HttpServletResponse response, String errorMessage) throws IOException {

        Gson gson = new Gson();
        ErrorResponse errorResponse = ErrorResponse.of(HttpStatus.UNAUTHORIZED, errorMessage);    // 401
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
    }


    enum LoginErrorMessage {
        BAD_CREDENTIALS("아이디 또는 패스워드가 일치하지 않습니다."),
        USER_ACCOUNT_NOT_FOUND("사용자 계정이 존재하지 않습니다."),
        AUTHENTICATION_CREDENTIALS_NOT_FOUND("사용자 계정의 인증 정보를 찾을 수 없습니다. 관리자에게 문의하세요."),
        UNKNOWN_FAILURE("알 수 없는 이유로 로그인에 실패하였습니다.");

        private final String message;

        LoginErrorMessage(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }
    }
}

package com.zerohip.server.security.response;

import com.google.gson.Gson;
import com.zerohip.server.common.response.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


public class ErrorResponder {

    public static void sendErrorResponse(HttpServletResponse response, HttpStatus status) throws IOException {

        ErrorResponse errorResponse = ErrorResponse.of(status);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(status.value());
        response.getWriter().write(new Gson().toJson(errorResponse, ErrorResponse.class));
    }

    public static void sendExpiredJwtExceptionError(HttpServletResponse response, HttpStatus status) throws IOException {

        ErrorResponse errorResponse = ErrorResponse.of(status, "Jwt 토큰의 유효기간이 만료되었습니다.");
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(status.value());
        response.getWriter().write(new Gson().toJson(errorResponse, ErrorResponse.class));
    }
}

package com.zerohip.server.security.handler;

import com.zerohip.server.security.response.ErrorResponder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class UserAuthenticationEntryPoint implements AuthenticationEntryPoint {

    // 토큰이 null 일 경우, nullPointerException 발생
    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {

        Exception exception = (Exception) request.getAttribute("exception");
        ErrorResponder.sendErrorResponse(response, HttpStatus.UNAUTHORIZED);

        logExceptionMessage(authException, exception);
    }

    // 유효하지 않은 JWT 또는 만료된 JWT 를 받게될 경우 error log
    private void logExceptionMessage(AuthenticationException authException, Exception exception) {

        String message = exception != null ? exception.getMessage() : authException.getMessage();
        log.warn("Unauthorized error happened: {}", message);
    }
}

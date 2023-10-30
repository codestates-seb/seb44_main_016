package com.zerohip.server.common.advice;

import com.zerohip.server.common.exception.BusinessLogicException;
import com.zerohip.server.common.response.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.validation.ConstraintViolationException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionAdvice {

    // RequestBody 의 유효성 검증 (dto 클래스 검증)
    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {

        log.error("error", e);
        return ErrorResponse.of(e.getBindingResult());
    }

    // 경로 error
    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleConstraintViolationException(ConstraintViolationException e) {

        log.error("error", e);
        return ErrorResponse.of(e.getConstraintViolations());
    }

    // BusinessLogicException (서비스 계층)
    @ExceptionHandler
    public ResponseEntity<?> handleBusinessLogicException(BusinessLogicException e) {

        log.error("error : ", e);
        return new ResponseEntity<>(ErrorResponse.of(e.getExceptionCode()),
                HttpStatus.valueOf(e.getExceptionCode().getStatus()));
    }

    // http 요청 메서드 error
    @ExceptionHandler
    public ErrorResponse handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {

        log.error("error : ", e);
        return ErrorResponse.of(HttpStatus.METHOD_NOT_ALLOWED);
    }

    // RequestBody missing
    @ExceptionHandler
    public ErrorResponse handleHttpMessageNotReadableException(HttpMessageNotReadableException e) {
        log.error("error : ", e);
        return ErrorResponse.of(HttpStatus.BAD_REQUEST, "Required request body is missing");
    }

    // parameter missing
    @ExceptionHandler
    public ErrorResponse handleMissingServletRequestParameterException(MissingServletRequestParameterException e) {
        log.error("error : ", e);
        return ErrorResponse.of(HttpStatus.BAD_REQUEST, "Required request parameter is missing");
    }
}


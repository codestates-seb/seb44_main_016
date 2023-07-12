package com.zerohip.server.common.dto;

import lombok.*;

import java.util.List;

public class ResponseDto {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class MessageResponseDto {
        private String message;
    }

    @AllArgsConstructor
    @Getter
    public static class SingleResponseDto<T> {
        private T data;
    }

    @AllArgsConstructor
    @Getter
    public static class SingleResponseWithMessageDto<T> {
        private T data;
        private String message;
    }

    @Getter
    @AllArgsConstructor
    public static class MultiResponseWithMessageDto<T> {
        private List<T> data;
        private String message;
    }
}

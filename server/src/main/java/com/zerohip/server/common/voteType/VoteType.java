package com.zerohip.server.common.voteType;

public enum VoteType {
    SAVING("SAVING"),
    FLEX("FLEX");

    private final String value;

    VoteType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}

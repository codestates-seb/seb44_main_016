package com.zerohip.server.common.feedType;

public enum FeedType {
    SAVING_TIP("절약팁"),
    PLEASE("허락해줘");

    private String feedType;

    FeedType (String feedType) {
        this.feedType = feedType;
    }
    public String getFeedType() {
        return feedType;
    }
}

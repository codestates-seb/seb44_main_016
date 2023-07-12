package com.zerohip.server.common.scope;

public enum Scope {
  FAREC_ARTICLE("가계부 게시글"),
  FAREC_TIMELINE("가계부 타임라인"),
  FEED("피드");

  private String scope;

  Scope(String description) {
    this.scope = description;
  }

  public String getScope() {
    return scope;
  }
}

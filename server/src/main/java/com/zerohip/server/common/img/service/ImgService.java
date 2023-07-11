package com.zerohip.server.common.img.service;

import com.zerohip.server.common.img.entity.Img;

import java.util.List;

public interface ImgService {

  List<Img> createImg(Article article, List<Img> imgList);
  Img findImg(Long imgId);
  List<Img> findImgs();
  void updateImg(Long imgId, Img.Patch patchParam);
  void deleteImg(Long imgId);
}

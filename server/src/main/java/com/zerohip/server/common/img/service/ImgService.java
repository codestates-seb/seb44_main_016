package com.zerohip.server.common.img.service;

import com.zerohip.server.common.article.Article;
import com.zerohip.server.common.img.entity.Img;
import com.zerohip.server.financialRecord.entity.FinancialRecord;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ImgService {

  List<Img> createImg(Article article, List<MultipartFile> files) throws IOException;

  Img createImg(FinancialRecord faRec, MultipartFile file) throws IOException;
  Img findImg(Long imgId);
  List<Img> findImgs();
//  void updateImg(Long imgId, ImgDto.Patch patchParam);
  void deleteImg(Img img);
  void deleteImgs(Article article, List<String> deleteImgPaths);
  Img findVerifiedImg(Long imgId);
  Img findVerifiedImg(String filePath);
}

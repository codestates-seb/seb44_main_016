package com.zerohip.server.common.img.service;

import com.zerohip.server.aws.config.S3Uploader;
import com.zerohip.server.common.article.Article;
import com.zerohip.server.common.img.dto.ImgDto;
import com.zerohip.server.common.img.entity.Img;
import com.zerohip.server.common.img.repository.ImgRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static com.zerohip.server.common.img.service.ImgServiceImpl.setArticle;

@Slf4j
@Service
@RequiredArgsConstructor
@Primary
public class S3ImgServiceImpl implements ImgService {

  private final S3Uploader s3Uploader;
  private final ImgRepository imgRepository;
  @Override
  public List<Img> createImg(Article article, List<MultipartFile> files) throws IOException {
    List<Img> imgList = new ArrayList<>();

    String dirName = "zerohip"; // 해당 이미지를 저장할 S3 bucket의 디렉토리 이름을 지정하세요.

    for (MultipartFile file : files) {
      // S3에 파일을 업로드하고, 그 URL을 가져옵니다.
      List<String> imageUrlList = s3Uploader.uploadFiles(List.of(file), dirName);

      // 이미지 생성자로 파일명, 파일경로 넘겨줌
      Img img = setImg(imageUrlList.get(0));

      // 게시판 글과 이미지 연결
      setArticle(article, img);

      // 파일 경로를 리스트에 저장
      imgList.add(img);
    }
    return imgRepository.saveAll(imgList);
  }

  private static Img setImg(String imageUrl) {
    Img img = new Img();
    img.setFileName(imageUrl.substring(imageUrl.lastIndexOf("/") + 1));  // URL의 마지막 부분을 파일 이름으로 사용합니다.
    img.setFilePath(imageUrl); // 전체 URL을 파일 경로로 사용합니다.
    return img;
  }

  @Override
  public Img findImg(Long imgId) {
    return null;
  }

  @Override
  public List<Img> findImgs() {
    return null;
  }

  @Override
  public void updateImg(Long imgId, ImgDto.Patch patchParam) {

  }

  @Override
  public void deleteImg(Long imgId) {

  }

  @Override
  public Img findVerifiedImg(Long imgId) {
    return null;
  }
}

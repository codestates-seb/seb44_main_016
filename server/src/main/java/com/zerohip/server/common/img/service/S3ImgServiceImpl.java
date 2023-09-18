package com.zerohip.server.common.img.service;

import com.zerohip.server.aws.config.S3ServiceImpl;
import com.zerohip.server.common.article.Article;
import com.zerohip.server.common.img.dto.ImgDto;
import com.zerohip.server.common.img.entity.Img;
import com.zerohip.server.common.img.repository.ImgRepository;
import com.zerohip.server.feedArticle.entity.FeedArticle;
import com.zerohip.server.financialRecord.entity.FinancialRecord;
import com.zerohip.server.financialRecordArticle.entity.FinancialRecordArticle;
import com.zerohip.server.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.zerohip.server.common.img.service.ImgServiceImpl.setArticle;
import static com.zerohip.server.common.img.service.ImgServiceImpl.setProfileImg;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
@Primary
public class S3ImgServiceImpl implements ImgService {

  private final S3ServiceImpl s3ServiceImpl;
  private final ImgRepository imgRepository;
  @Override
  public List<Img> createImg(Article article, List<MultipartFile> files) throws IOException {
    List<Img> imgList = new ArrayList<>();

    String dirName = "zerohip"; // 해당 이미지를 저장할 S3 bucket의 디렉토리 이름을 지정하세요.

    // S3에 파일들을 업로드하고, 그 URL 리스트를 저장
    List<String> imgKeys = s3ServiceImpl.uploadFiles(files, dirName);

    for (String imgKey : imgKeys) {
      // 키로 부터 사전 서명된 URL을 가져옴
      String imageUrl = s3ServiceImpl.generatePresignedUrl(imgKey);

      // 이미지 생성자로 파일명, 파일경로 넘겨줌
      Img img = setImg(imageUrl);

      // 게시판 글과 이미지 연결
      setArticle(article, img);

      // 파일 경로를 리스트에 저장
      imgList.add(img);
    }
    return imgRepository.saveAll(imgList);
  }

  public Img createImg(FinancialRecord financialRecord, MultipartFile files) throws IOException {
    String dirName = "zerohip"; // 해당 이미지를 저장할 S3 bucket의 디렉토리 이름을 지정하세요.

    // S3에 파일들을 업로드하고, 그 URL 리스트를 저장
    String imgKey = s3ServiceImpl.uploadFile(files, dirName);
    String imageUrl = s3ServiceImpl.generatePresignedUrl(imgKey);

    // 이미지 생성자로 파일명, 파일경로 넘겨줌
    Img img = setImg(imageUrl);

    // 게시판 글과 이미지 연결
    setProfileImg(financialRecord, img);

    // 파일 경로를 리스트에 저장
    return imgRepository.save(img);
  }

  public Img createImg(User user, MultipartFile files) throws IOException {
    String dirName = "zerohip"; // 해당 이미지를 저장할 S3 bucket의 디렉토리 이름을 지정하세요.

    // S3에 파일들을 업로드하고, 그 URL 리스트를 저장
    String imgKey = s3ServiceImpl.uploadFile(files, dirName);
    String imageUrl = s3ServiceImpl.generatePresignedUrl(imgKey);

    // 이미지 생성자로 파일명, 파일경로 넘겨줌
    Img img = setImg(imageUrl);

    // 게시판 글과 이미지 연결
    setProfileImg(user, img);

    // 파일 경로를 리스트에 저장
    return imgRepository.save(img);
  }

  private static Img setImg(String imageUrl) {
    Img img = new Img();
    img.setFileName(imageUrl.substring(imageUrl.lastIndexOf("/") + 1));  // URL의 마지막 부분을 파일 이름으로 사용합니다.
    img.setFilePath(imageUrl); // 전체 URL을 파일 경로로 사용합니다.
    return img;
  }

  @Override
  public Img findImg(Long imgId) {
    return findVerifiedImg(imgId);
  }

  @Override
  public List<Img> findImgs() {
    return imgRepository.findAll();
  }

  @Override
  public void deleteImg(Img img) {
    // S3에서 이미지를 삭제
    s3ServiceImpl.deleteFileFromS3(img.getFilePath());
    // DB에서 이미지 정보를 삭제
    imgRepository.delete(img);
  }

  @Override
  public void deleteImgs(Article article, List<String> deleteImgPaths) {
    for (String path : deleteImgPaths) {
      Img findImg = imgRepository.findByFilePath(path);
      if (findImg == null) {
        throw new IllegalArgumentException("해당 이미지가 없습니다.");
      }
      deleteImg(findImg);
      s3ServiceImpl.deleteFileFromS3(findImg.getFilePath());
    }
  }

  @Override
  public Img findVerifiedImg(Long imgId) {
    Optional<Img> optionalImg = imgRepository.findById(imgId);
    Img findImg = optionalImg.orElseThrow(() -> new IllegalArgumentException("해당 이미지가 없습니다."));
    return findImg;
  }

  @Override
  public Img findVerifiedImg(String filePath) {
    Img findImg = imgRepository.findByFilePath(filePath);
    findVerifiedImg(findImg.getId());
    return findImg;
  }
}

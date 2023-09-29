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
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImgServiceImpl {

  private final ImgRepository imgRepository;
  private final S3ServiceImpl s3ServiceImpl;

  // 이미지 저장

  public List<Img> createImg(Article article, List<MultipartFile> files) {
    ArrayList<Img> imgList = new ArrayList<>();
    // 파일 저장 경로 지정 - 현재 우리의 프로젝트 경로에 images 폴더를 생성하고 그 안에 저장
    // System.getProperty("user.dir") : 현재 프로젝트 경로(터미널에서 pwd를 수행했을 때 나오는 경로와 동일)
    // 그러나 배포 환경에서 JAR파일 내부에 파일을 저장하게 된다.
    // 배포 환경에서 외부 저장소나 별도의 서버가 필요.
    String imagePath = System.getProperty("user.dir") + "/src/main/resources/static/images/";

    for (MultipartFile file : files) {
      // 파일명 지정(중복 방지)
      String filename = getFilename(imagePath, file);

      // 이미지 생성자로 파일명, 파일경로 넘겨줌
      Img img = setImg(filename);

      // 게시판 글과 이미지 연결
      setArticle(article, img);

      // 파일 경로를 리스트에 저장
      imgList.add(img);
    }
    return imgRepository.saveAll(imgList);
  }

  public Img createImg(FinancialRecord faRec, MultipartFile file) throws IOException {
    return null;
  }

  // 이미지 조회
  public Img findImg(Long imgId) {
    return findVerifiedImg(imgId);
  }

  // 이미지 전체 조회(쓸일 있을까 싶어서,,)
  public List<Img> findImgs() {
    return imgRepository.findAll();
  }

  // 이미지 삭제
  public void deleteImg(Img img) {
    // S3에서 이미지를 삭제
    s3ServiceImpl.deleteFileFromS3(img.getFilePath());
    // DB에서 이미지 정보를 삭제
    imgRepository.delete(img);
  }

  public void deleteImgs(Article article, List<String> deleteImgPaths) {
    for (String path : deleteImgPaths) {
      Img findImg = imgRepository.findByFilePath(path);
      if (findImg == null) {
        throw new IllegalArgumentException("해당 이미지가 없습니다.");
      }
      deleteImg(findImg);
    }
  }


  // 이미지 검증
  public Img findVerifiedImg(Long imgId) {
    return imgRepository.findById(imgId).orElseThrow(
        () -> new RuntimeException("존재하지 않는 이미지입니다.")
    );
  }
  public Img findVerifiedImg(String filePath) {
    Img findImg = imgRepository.findByFilePath(filePath);
    findVerifiedImg(findImg.getId());
    return findImg;
  }

  // 파일명 지정(중복 방지)
  private static String getFilename(String imagePath, MultipartFile file) {
    // 랜덤 식별자 생성(UUID로 생성) -> UUID를 사용하여 파일명 중복방지를 처리하고 있지만 DB에서 자동으로 생성하는 고유 ID값을 통해 중복 방지도 가능
    // id값을 통해서 파일명을 지정할 수 있지만 `IDENTITY` 전략을 사용하면 DB에 저장되기 전에는 id값이 없기 때문에 파일명을 지정할 수 없다.
    // 또한 동시성 문제 등에 의거해 UUID를 사용하여 파일명을 지정했다.
    String uuid = UUID.randomUUID().toString();

    // 랜덤 식별자와 파일명 지정(중복 방지)
    // Ex) 1234-1234-1234-1234_파일명.jpg
    String filename = uuid + "_" + file.getOriginalFilename();

    // java.io.File 클래스의 인스턴스 생성
    // 파일 경로와 이름을 지정
    // imagePath(파일경로) + filename(파일명)을 합친 문자열로 file 인스턴스 생성
    File dest = new File(imagePath + filename);

    // 파일 저장
    // transferTo() 메서드를 호출하면 클라이언트가 업로드한 파일의 내용이 (dest)에 지정된 파일 경로로 저장됨.
    try {
      file.transferTo(dest);
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
    return filename;
  }

  // 이미지 생성자
  static Img setImg(String filename) {
    Img img = new Img();
    img.setFileName(filename);
    img.setFilePath("/images/" + filename);
    return img;
  }

  // 게시판글과 이미지 연결
  static void setArticle(Article article, Img img) {
    if (article instanceof FinancialRecordArticle financialRecordArticle) {
      img.setFinancialRecordArticle(financialRecordArticle);
    } else if (article instanceof FeedArticle feedArticle) {
      img.setFeedArticle(feedArticle);
    } else {
      throw new RuntimeException("존재하지 않는 게시글입니다.");
    }
  }

  static void setProfileImg(FinancialRecord faRec, Img img) {
    img.setFinancialRecord(faRec);
  }

  static void setProfileImg(User user, Img img) {
    img.setUser(user);
  }
}

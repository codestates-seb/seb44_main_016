package com.zerohip.server.aws.config;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.zerohip.server.feedArticle.repository.FeedArticleRepository;
import com.zerohip.server.financialRecordArticle.repository.FinancialRecordArticleRepository;
import com.zerohip.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3Uploader {

  private final AmazonS3Client amazonS3Client;
  private final FinancialRecordArticleRepository financialRecordArticleRepository;
  private final FeedArticleRepository feedArticleRepository;
  private final UserRepository userRepository;

  @Value("${cloud.aws.s3.bucket}")
  private String bucket;

  @Transactional
  public List<String> uploadFiles(List<MultipartFile> multipartFiles, String dirName) throws IOException {
    List<File> uploadFiles = new ArrayList<>();
    for (MultipartFile multipartFile : multipartFiles) {
      File uploadFile = convert(multipartFile)
              .orElseThrow(() -> new IllegalArgumentException("File로 전환이 실패했습니다."));
      uploadFiles.add(uploadFile);
    }
    return upload(uploadFiles, dirName);
  }

  private List<String> upload(List<File> uploadFiles, String dirName) {
    List<String> uploadImgUrlList = new ArrayList<>();
    for (File uploadFile : uploadFiles) {
      String fileName = dirName + "/" + uploadFile.getName();
      String uploadImgUrl = putS3(uploadFile, fileName);
      uploadImgUrlList.add(uploadImgUrl);
      removeNewFile(uploadFile);
    }
    return uploadImgUrlList;
  }

  private String putS3(File uploadFile, String fileName) {
    amazonS3Client.putObject(
            new PutObjectRequest(bucket, fileName, uploadFile)
                    .withCannedAcl(CannedAccessControlList.PublicRead)
    );
    return amazonS3Client.getUrl(bucket, fileName).toString();
  }

  private void removeNewFile(File targetFile) {
    if(targetFile.delete()) {
      log.info("파일이 삭제되었습니다.");
    } else {
      log.info("파일이 삭제되지 않았습니다.");
    }
  }

  // 로컬에 파일 업로드 하기
  private Optional<File> convert(MultipartFile file) throws IOException {
    File convertFile =  new File(System.getProperty("user.dir") + "/src/main/resources/static/images/" + file.getOriginalFilename());
    if(convertFile.createNewFile()) {
      try (FileOutputStream fos = new FileOutputStream(convertFile)) {
        fos.write(file.getBytes());
      }
      return Optional.of(convertFile);
    }
    return Optional.empty();
  }
}

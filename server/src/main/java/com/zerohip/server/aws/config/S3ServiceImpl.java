package com.zerohip.server.aws.config;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.zerohip.server.feedArticle.repository.FeedArticleRepository;
import com.zerohip.server.financialRecordArticle.repository.FinancialRecordArticleRepository;
import com.zerohip.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j  // SLF4J 로깅 시스템을 사용한다는 것을 나타냄
@Service  // 이 클래스가 스프링 서비스임을 나타냄
@Transactional
@RequiredArgsConstructor  // final 필드 또는 @NonNull이 있는 필드만을 인자로 하는 생성자를 자동 생성
public class S3ServiceImpl {

  private final AmazonS3Client amazonS3Client;  // Amazon S3 클라이언트

  @Value("${cloud.aws.s3.bucket}")  // 프로퍼티 파일에서 S3 버킷 이름을 가져옴
  private String bucket;

  public List<String> uploadFiles(List<MultipartFile> multipartFiles, String dirName) throws IOException {
    List<String> uploadImgUrlList = new ArrayList<>();
    for (MultipartFile multipartFile : multipartFiles) {
      String uploadImgUrl = putS3(multipartFile, dirName);  // S3에 파일 업로드하고 URL을 가져옴
      uploadImgUrlList.add(uploadImgUrl);  // URL을 리스트에 추가
    }
    return uploadImgUrlList;  // 파일 URL 리스트 반환
  }

  public String uploadFile(MultipartFile multipartFile, String dirName) throws IOException {
    return putS3(multipartFile, dirName);// S3에 파일 업로드하고 URL을 가져옴
  }

  private String putS3(MultipartFile multipartFile, String dirName) throws IOException {
    // 파일 이름을 UUID를 이용해서 생성
    String fileName = setFileName(multipartFile, dirName);  // 파일 이름 설정

    // Metadata 생성
    ObjectMetadata metadata = setMetaData(multipartFile);  // 메타데이터 설정

    // S3에 업로드
    putObject(multipartFile, fileName, metadata);  // 파일 업로드

    return fileName;  // 파일 이름 반환
  }

  public String generatePresignedUrl(String objectKey) {
    // 업로드된 파일의 URL을 얻는다.
    java.util.Date expiration = new java.util.Date();
    long expTimeMillis = expiration.getTime();
    expTimeMillis += 1000 * 60 * 60; // 1 hour expiration
    expiration.setTime(expTimeMillis);

    // 사전 서명된 URL 생성
    GeneratePresignedUrlRequest generatePresignedUrlRequest =
            new GeneratePresignedUrlRequest(bucket, objectKey)
                    .withMethod(HttpMethod.GET)
                    .withExpiration(expiration);
    URL url = amazonS3Client.generatePresignedUrl(generatePresignedUrlRequest);  // 사전 서명된 URL 생성

    return url.toString();  // URL 문자열 반환
  }

  public void deleteFileFromS3(String fileName) {
    // S3에서 파일 삭제
    amazonS3Client.deleteObject(bucket, fileName);
    log.info("파일이 S3에서 삭제되었습니다: {}", fileName);
  }

  private void putObject(MultipartFile multipartFile, String fileName, ObjectMetadata metadata) throws IOException {
    // S3에 파일 업로드. 파일의 내용, 이름, 메타데이터 등을 함께 전달
    amazonS3Client.putObject(
            new PutObjectRequest(bucket, fileName, multipartFile.getInputStream(), metadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead)
    );
    log.info("파일이 S3에 업로드되었습니다: {}", fileName);  // 로그 출력
  }

  private static ObjectMetadata setMetaData(MultipartFile multipartFile) {
    // 메타데이터 생성
    ObjectMetadata metadata = new ObjectMetadata();
    metadata.setContentType(multipartFile.getContentType());  // 파일 타입 설정
    metadata.setContentLength(multipartFile.getSize());  // 파일 크기 설정
    return metadata;  // 메타데이터 반환
  }

  private static String setFileName(MultipartFile multipartFile, String dirName) {
    // UUID를 이용해 파일 이름을 생성
    String originalFilename = multipartFile.getOriginalFilename();
    String newName = UUID.randomUUID().toString();
    try {
      if (originalFilename != null) {
        newName += originalFilename;
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
    String fileName = dirName + "/" + newName;
    log.info("fileName: {}", fileName);
    return fileName;  // 파일 이름 반환
  }
}

package com.zerohip.server.financialRecord.controller;

import com.zerohip.server.common.page.dto.MultiResponseDto;
import com.zerohip.server.financialRecord.dto.FinancialRecordDto;
import com.zerohip.server.financialRecord.entity.FinancialRecord;
import com.zerohip.server.financialRecord.mapper.FinancialRecordMapper;
import com.zerohip.server.financialRecord.service.FinancialRecordService;
import com.zerohip.server.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;


@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/financial-record")
public class FinancialRecordController {

  private final static String FINANCIAL_RECORD_DEFAULT_URI = "/financial-record";
  private final FinancialRecordService faRecService;
  private final FinancialRecordMapper mapper;

  @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity createFinancialRecord(@RequestPart("data") @Valid FinancialRecordDto.Post data,
                                              @AuthenticationPrincipal String authorId,
                                              @RequestPart("file")MultipartFile file) {
    FinancialRecord createFaRec = faRecService.createFaRec(authorId, mapper.financialRecordPostToFinancialRecord(data), file);
    log.info("createFaRec.getFinancialRecordId() : {}", createFaRec.getFinancialRecordId());
    URI uri = URI.create(FINANCIAL_RECORD_DEFAULT_URI + "/" + createFaRec.getFinancialRecordId());

    log.info("createFaRec.getCreatedAt() : {}", createFaRec.getCreatedAt());

    return ResponseEntity.created(uri).body(mapper.financialRecordToFinancialRecordResponse(createFaRec));
  }

  @GetMapping("/{financial-record-id}")
  public ResponseEntity getFinancialRecord(@PathVariable("financial-record-id") Long financialRecordId,
                                           @AuthenticationPrincipal String authorId) {
    FinancialRecord findFaRec = faRecService.findFaRec(authorId, financialRecordId);

    return ResponseEntity.ok(mapper.financialRecordToFinancialRecordResponse(findFaRec));
  }

  @GetMapping
  public ResponseEntity getFinancialRecords(@AuthenticationPrincipal String authorId) {

    List<FinancialRecord> myFaRec = faRecService.findFaRecs(authorId);
    return ResponseEntity.ok(new MultiResponseDto<>(mapper.financialRecordsToFinancialRecordResponses(myFaRec)));
  }

  @PatchMapping(value = "/{financial-record-id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity patchFinancialRecord(@PathVariable("financial-record-id") Long financialRecordId,
                                             @RequestPart("data") @Valid FinancialRecordDto.Patch data,
                                             @AuthenticationPrincipal String authorId,
                                             @RequestPart("file") MultipartFile file) {
    FinancialRecord updateFaRec = faRecService.updateFaRec(authorId, financialRecordId, data, file);

    return ResponseEntity.ok(mapper.financialRecordToFinancialRecordResponse(updateFaRec));
  }

  @DeleteMapping("/{financial-record-id}")
  public ResponseEntity deleteFinancialRecord(@PathVariable("financial-record-id") Long financialRecordId,
                                              @AuthenticationPrincipal String authorId) {
    faRecService.deleteFaRec(authorId, financialRecordId);

    return ResponseEntity.noContent().build();
  }
}
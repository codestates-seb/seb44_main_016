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
                                              @AuthenticationPrincipal User author,
                                              @RequestPart("file")MultipartFile file) {
    FinancialRecord createFaRec = faRecService.createFaRec(author, mapper.financialRecordPostToFinancialRecord(data), file);
    URI uri = URI.create(FINANCIAL_RECORD_DEFAULT_URI + "/" + createFaRec.getFinancialRecordId());

    log.info("createFaRec.getCreatedAt() : {}", createFaRec.getCreatedAt());

    return ResponseEntity.created(uri).body(mapper.financialRecordToFinancialRecordResponse(createFaRec));
  }

  @GetMapping("/{financial-record-id}")
  public ResponseEntity getFinancialRecord(@PathVariable("financial-record-id") Long financialRecordId,
                                           @AuthenticationPrincipal User author) {
    FinancialRecord findFaRec = faRecService.findFaRec(author, financialRecordId);

    return ResponseEntity.ok(mapper.financialRecordToFinancialRecordResponse(findFaRec));
  }

  @GetMapping
  public ResponseEntity getFinancialRecords(@AuthenticationPrincipal User author) {
    List<FinancialRecord> myFaRec = faRecService.findFaRecs(author);
    return ResponseEntity.ok(new MultiResponseDto<>(mapper.financialRecordsToFinancialRecordResponses(myFaRec)));
  }

  @PatchMapping(value = "/{financial-record-id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity patchFinancialRecord(@PathVariable("financial-record-id") Long financialRecordId,
                                             @RequestPart("data") @Valid FinancialRecordDto.Patch data,
                                             @AuthenticationPrincipal User author,
                                             @RequestPart("file") MultipartFile file) {
    FinancialRecord updateFaRec = faRecService.updateFaRec(author, financialRecordId, data, file);

    return ResponseEntity.ok(mapper.financialRecordToFinancialRecordResponse(updateFaRec));
  }

  @DeleteMapping("/{financial-record-id}")
  public ResponseEntity deleteFinancialRecord(@PathVariable("financial-record-id") Long financialRecordId,
                                              @AuthenticationPrincipal User author) {
    faRecService.deleteFaRec(author, financialRecordId);

    return ResponseEntity.noContent().build();
  }
}
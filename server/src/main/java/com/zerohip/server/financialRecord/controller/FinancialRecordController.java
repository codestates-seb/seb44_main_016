package com.zerohip.server.financialRecord.controller;

import com.zerohip.server.common.page.dto.MultiResponseDto;
import com.zerohip.server.financialRecord.dto.FinancialRecordDto;
import com.zerohip.server.financialRecord.entity.FinancialRecord;
import com.zerohip.server.financialRecord.mapper.FinancialRecordMapper;
import com.zerohip.server.financialRecord.service.FinancialRecordService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
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

  @PostMapping
  public ResponseEntity createFinancialRecord(@Valid @RequestBody FinancialRecordDto.Post requestbody) {
    FinancialRecord createFaRec = faRecService.createFaRec(mapper.financialRecordPostToFinancialRecord(requestbody));
    URI uri = URI.create(FINANCIAL_RECORD_DEFAULT_URI + "/" + createFaRec.getFinancialRecordId());

    log.info("createFaRec.getCreatedAt() : {}", createFaRec.getCreatedAt());

    return ResponseEntity.created(uri).body(mapper.financialRecordToFinancialRecordResponse(createFaRec));
  }

  @GetMapping("/{financial-record-id}")
  public ResponseEntity getFinancialRecord(@PathVariable("financial-record-id") Long financialRecordId) {
    FinancialRecord findFaRec = faRecService.findFaRec(financialRecordId);

    return ResponseEntity.ok(mapper.financialRecordToFinancialRecordResponse(findFaRec));
  }

  @GetMapping
  public ResponseEntity getFinancialRecords(@Positive @RequestParam("page") int page,
                                             @Positive @RequestParam("size") int size) {
    Page<FinancialRecord> pageFaRec = faRecService.findFaRecs(page, size);
    List<FinancialRecord> allFaRecs = pageFaRec.getContent();
    return ResponseEntity.ok(new MultiResponseDto<>(mapper.financialRecordsToFinancialRecordResponses(allFaRecs), pageFaRec));
  }

  @PatchMapping("/{financial-record-id}")
  public ResponseEntity patchFinancialRecord(@PathVariable("financial-record-id") Long financialRecordId,
                                              @Valid @RequestBody FinancialRecordDto.Patch requestbody) {
    FinancialRecord updateFaRec = faRecService.updateFaRec(financialRecordId, requestbody);

    return ResponseEntity.ok(mapper.financialRecordToFinancialRecordResponse(updateFaRec));
  }

  @DeleteMapping("/{financial-record-id}")
  public ResponseEntity deleteFinancialRecord(@PathVariable("financial-record-id") Long financialRecordId) {
    faRecService.deleteFaRec(financialRecordId);

    return ResponseEntity.noContent().build();
  }
}

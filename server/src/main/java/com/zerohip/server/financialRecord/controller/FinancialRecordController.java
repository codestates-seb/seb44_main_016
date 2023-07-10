package com.zerohip.server.financialRecord.controller;

import com.zerohip.server.financialRecord.service.FinancialRecordService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/financial-record")
public class FinancialRecordController {

  private final static String FINANCIAL_RECORD_DEFAULT_URI = "/financial-record";
  private final FinancialRecordService faRecService;


  @PostMapping
  public ResponseEntity createFinancialRecord() {

    return null;
  }
}

package com.zerohip.server.financialRecord.mapper;

import com.zerohip.server.financialRecord.dto.FinancialRecordDto;
import com.zerohip.server.financialRecord.entity.FinancialRecord;
import org.mapstruct.Mapper;

import java.util.List;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;
import static org.mapstruct.ReportingPolicy.IGNORE;

@Mapper(componentModel = SPRING, unmappedTargetPolicy = IGNORE)
public interface FinancialRecordMapper {
  FinancialRecord financialRecordPostToFinancialRecord(FinancialRecordDto.Post requestBody);
  FinancialRecord financialRecordPatchToFinancialRecord(FinancialRecordDto.Patch requestBody);
  FinancialRecordDto.Response financialRecordToFinancialRecordResponse(FinancialRecord financialRecord); // FinancialRecord -> FinancialRecordDto.Response
  List<FinancialRecordDto.Response> financialRecordsToFinancialRecordResponses(List<FinancialRecord> financialRecords);
}

package com.zerohip.server.financialRecord.mapper;

import com.zerohip.server.financialRecord.dto.FinancialRecordDto;
import com.zerohip.server.financialRecord.entity.FinancialRecord;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

import static org.mapstruct.MappingConstants.ComponentModel.SPRING;
import static org.mapstruct.ReportingPolicy.IGNORE;

@Mapper(componentModel = SPRING, unmappedTargetPolicy = IGNORE)
public abstract class FinancialRecordMapper {
  public abstract FinancialRecord financialRecordPostToFinancialRecord(FinancialRecordDto.Post requestBody);
  public abstract FinancialRecord financialRecordPatchToFinancialRecord(FinancialRecordDto.Patch requestBody);
  public abstract FinancialRecordDto.Response financialRecordToFinancialRecordResponse(FinancialRecord financialRecord); // FinancialRecord -> FinancialRecordDto.Response
  public abstract List<FinancialRecordDto.Response> financialRecordsToFinancialRecordResponses(List<FinancialRecord> financialRecords);

  @AfterMapping
  protected void mapFilePath(FinancialRecord financialRecord, @MappingTarget FinancialRecordDto.Response response) {
    String filePath = financialRecord.getProfileImg().getFilePath();
    response.setFilePath(filePath);
  }
}


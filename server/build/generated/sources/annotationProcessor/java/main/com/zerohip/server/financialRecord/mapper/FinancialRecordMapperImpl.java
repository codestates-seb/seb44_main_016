package com.zerohip.server.financialRecord.mapper;

import com.zerohip.server.financialRecord.dto.FinancialRecordDto;
import com.zerohip.server.financialRecord.entity.FinancialRecord;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-13T10:54:59+0900",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.0.jar, environment: Java 17.0.7 (Amazon.com Inc.)"
)
@Component
public class FinancialRecordMapperImpl implements FinancialRecordMapper {

    @Override
    public FinancialRecord financialRecordPostToFinancialRecord(FinancialRecordDto.Post requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        FinancialRecord financialRecord = new FinancialRecord();

        financialRecord.setFinancialRecordName( requestBody.getFinancialRecordName() );
        financialRecord.setMemo( requestBody.getMemo() );

        return financialRecord;
    }

    @Override
    public FinancialRecord financialRecordPatchToFinancialRecord(FinancialRecordDto.Patch requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        FinancialRecord financialRecord = new FinancialRecord();

        financialRecord.setFinancialRecordName( requestBody.getFinancialRecordName() );
        financialRecord.setMemo( requestBody.getMemo() );

        return financialRecord;
    }

    @Override
    public FinancialRecordDto.Response financialRecordToFinancialRecordResponse(FinancialRecord financialRecord) {
        if ( financialRecord == null ) {
            return null;
        }

        Long financialRecordId = null;
        String financialRecordName = null;
        String memo = null;
        LocalDateTime createdAt = null;
        LocalDateTime modifiedAt = null;

        financialRecordId = financialRecord.getFinancialRecordId();
        financialRecordName = financialRecord.getFinancialRecordName();
        memo = financialRecord.getMemo();
        createdAt = financialRecord.getCreatedAt();
        modifiedAt = financialRecord.getModifiedAt();

        FinancialRecordDto.Response response = new FinancialRecordDto.Response( financialRecordId, financialRecordName, memo, createdAt, modifiedAt );

        return response;
    }

    @Override
    public List<FinancialRecordDto.Response> financialRecordsToFinancialRecordResponses(List<FinancialRecord> financialRecords) {
        if ( financialRecords == null ) {
            return null;
        }

        List<FinancialRecordDto.Response> list = new ArrayList<FinancialRecordDto.Response>( financialRecords.size() );
        for ( FinancialRecord financialRecord : financialRecords ) {
            list.add( financialRecordToFinancialRecordResponse( financialRecord ) );
        }

        return list;
    }
}

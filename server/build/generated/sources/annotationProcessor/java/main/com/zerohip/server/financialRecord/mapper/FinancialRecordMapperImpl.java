package com.zerohip.server.financialRecord.mapper;

import com.zerohip.server.financialRecord.dto.FinancialRecordDto;
import com.zerohip.server.financialRecord.entity.FinancialRecord;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-07-06T14:18:57+0900",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.1.1.jar, environment: Java 17.0.7 (Amazon.com Inc.)"
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

        return financialRecord;
    }

    @Override
    public FinancialRecord financialRecordPatchToFinancialRecord(FinancialRecordDto.Patch requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        FinancialRecord financialRecord = new FinancialRecord();

        financialRecord.setFinancialRecordName( requestBody.getFinancialRecordName() );

        return financialRecord;
    }

    @Override
    public FinancialRecordDto.Response financialRecordToFinancialRecordResponse(FinancialRecord financialRecord) {
        if ( financialRecord == null ) {
            return null;
        }

        Long financialRecordId = null;
        String financialRecordName = null;

        financialRecordId = financialRecord.getFinancialRecordId();
        financialRecordName = financialRecord.getFinancialRecordName();

        FinancialRecordDto.Response response = new FinancialRecordDto.Response( financialRecordId, financialRecordName );

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

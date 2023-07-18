package com.zerohip.server;

import com.zerohip.server.common.scope.Scope;
import com.zerohip.server.financialRecord.entity.FinancialRecord;
import com.zerohip.server.financialRecord.repository.FinancialRecordRepository;
import com.zerohip.server.financialRecordArticle.entity.FinancialRecordArticle;
import com.zerohip.server.financialRecordArticle.repository.FinancialRecordArticleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

import java.time.LocalDate;

@Slf4j
@RequiredArgsConstructor
public class MockDataInit {

  private final FinancialRecordRepository financialRecordRepository;
  private final FinancialRecordArticleRepository financialRecordArticleRepository;

  /**
   * 확인용 초기 데이터 추가
   */
  @EventListener(ApplicationReadyEvent.class)
  public void initData() {
    log.info("test data init");
    // financialRecord
    financialRecordRepository.save(new FinancialRecord("2023 하반기 대한민국을 강타할 절약 프로젝트", "돈많은 백수가 되는법!"));
    financialRecordRepository.save(new FinancialRecord("2023 역사상 최고의 저축 프로젝트", "파이어족 제 1부"));


    // financialRecordArticle
    // 2023 하반기 대한민국을 강타할 절약 프로젝트
    financialRecordArticleRepository.save(new FinancialRecordArticle("하루 1컵라면 프로젝트", "한국인은 밥심. 그러나 나는 한국인이 아니었던 것.", LocalDate.of(2023, 7 ,11), "식비", 10_000, Scope.FAREC_ARTICLE, financialRecordRepository.findById(1L).orElseThrow()));
    financialRecordArticleRepository.save(new FinancialRecordArticle("아이스크림", "여름이다. 아이스크림 정도는 사먹어도 된다.", LocalDate.of(2023, 7 ,13), "식비", 1_800, Scope.FAREC_ARTICLE, financialRecordRepository.findById(1L).orElseThrow()));
    financialRecordArticleRepository.save(new FinancialRecordArticle("aws 과금시작ㅜㅜ", "aws는 우리의 수면도, 돈도 뺏어간다.(feat. 자면서 돈 뺏기는 법)", LocalDate.of(2023, 7 ,18), "기타", 1_200, Scope.FAREC_TIMELINE, financialRecordRepository.findById(1L).orElseThrow()));
    financialRecordArticleRepository.save(new FinancialRecordArticle("여름인데 에어컨은 켜야지. 그게 맞아", "더워서 죽으면 일확천금도 없다!!", LocalDate.of(2023, 7 ,12), "세금", 40_000, Scope.FAREC_ARTICLE, financialRecordRepository.findById(1L).orElseThrow()));

    // 2023 역사상 최고의 저축 프로젝트
    financialRecordArticleRepository.save(new FinancialRecordArticle("나는 통장보다 가난하다.", "일단 무자비한 월급의 70% 저축", LocalDate.of(2023, 7 ,10), "월급", 1_700_000, Scope.FAREC_TIMELINE, financialRecordRepository.findById(2L).orElseThrow()));
    financialRecordArticleRepository.save(new FinancialRecordArticle("아직까지는 티끌모아 티끌", "코인노래방 갈돈이라도 저축하자", LocalDate.of(2023, 7 ,1), "저축", 3_000, Scope.FAREC_ARTICLE, financialRecordRepository.findById(2L).orElseThrow()));
    financialRecordArticleRepository.save(new FinancialRecordArticle("영양실조만 아니면 됐어", "삼각김밥 사먹고 남은 돈 저축", LocalDate.of(2023, 7 ,12), "저축", 7_800, Scope.FAREC_TIMELINE, financialRecordRepository.findById(2L).orElseThrow()));
    financialRecordArticleRepository.save(new FinancialRecordArticle("땅파면 돈 나오냐? 안파도 나와요.", "동전 주웠다^~^", LocalDate.of(2023, 7 ,7), "저축", 10, Scope.FAREC_TIMELINE, financialRecordRepository.findById(2L).orElseThrow()));
  }
}

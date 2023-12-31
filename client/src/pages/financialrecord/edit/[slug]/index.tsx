import { useQuery } from '@tanstack/react-query';
import FaRecForm from '../../FaRecForm';
import { APIfinancialRecord } from '../../../../services/apiFinancial';
import Loading from '../../../../components/Loading';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import HeadMeta from '../../../../components/HeadMeta';
import { FAREC_META_DATA } from '../../../../constants/seo/faRecMetaData';

type FaRecArticleResType = {
  financialRecordId: number;
  financialRecordName: string;
  memo: string;
  filePath: string;
};

export default function FaRecEditPage() {
  const router = useRouter();
  const financialRecordId = router.query.slug ? Number(router.query.slug) : 0;
  const { isLoading, isError, error, data, isSuccess } = useQuery<FaRecArticleResType>(
    ['reFac'],
    () => APIfinancialRecord.getFaRec(financialRecordId),
    { staleTime: 1000 * 60 * 30 }
  );

  let financialRecordName, memo, filePath;
  if (data) {
    financialRecordName = data.financialRecordName;
    memo = data.memo;
    filePath = data.filePath;
  }
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    toast.error(`${error} 에러가 발생하였습니다.`);
    toast.info('잠시 후에 다시 시도해주세요.');
  }

  return (
    <>
      <HeadMeta
        title={FAREC_META_DATA.FINANCIAL_RECORD_UPDATE_PAGE.TITLE}
        description={FAREC_META_DATA.FINANCIAL_RECORD_UPDATE_PAGE.DESCRIPTION}
      />
      {isSuccess && (
        <FaRecForm
          pageType='edit'
          financialRecordId={financialRecordId}
          initialFaRecName={financialRecordName}
          initialFaRecDesc={memo}
          initialImage={filePath}
        />
      )}
    </>
  );
}

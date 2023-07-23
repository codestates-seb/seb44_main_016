import { useQuery } from '@tanstack/react-query';
import FaRecForm from '../../FaRecForm';
import { APIfinancialRecord } from '../../../../services/apiFinancial';
import { Metadata } from 'next';
import Loading from '../../../../components/Loading';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { PAGE_NAMES } from '../../../../constants/pageNames';
import withAuth from '../../../../components/WithAuth';

type FaRecData = {
  financialRecordId: number;
  financialRecordName: string;
  memo: string;
  imgPath: string;
};

export const metadata: Metadata = {
  title: PAGE_NAMES.FINANCIAL_RECORD_UPDATE,
  description: `${PAGE_NAMES.FINANCIAL_RECORD_UPDATE} 페이지입니다.`,
};

function FaRecEditPage() {
  const router = useRouter();
  const financialRecordId = router.query.slug ? Number(router.query.slug) : 0;
  const { isLoading, isError, error, data, isSuccess } = useQuery<FaRecData>(
    ['reFac'],
    () => APIfinancialRecord.getFaRec(financialRecordId),
    { staleTime: 1000 * 60 * 30 }
  );

  let financialRecordName, memo, imgPath;
  if (data) {
    financialRecordName = data.financialRecordName;
    memo = data.memo;
    imgPath = data.imgPath;
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
      <h1 className='blind'>{PAGE_NAMES.FINANCIAL_RECORD_UPDATE} 페이지</h1>
      {isSuccess && (
        <FaRecForm
          pageType='edit'
          financialRecordId={financialRecordId}
          initialFaRecName={financialRecordName}
          initialFaRecDesc={memo}
          initialImage={imgPath}
        />
      )}
    </>
  );
}

export default withAuth(FaRecEditPage);

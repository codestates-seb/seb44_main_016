import { useQuery } from '@tanstack/react-query';
import FaRecForm from '../../FaRecForm';
import { APIfinancialRecord } from '../../../../services/apiFinancial';
import { Metadata } from 'next';
import Loading from '../../../../components/Loading';
import { toast } from 'react-toastify';

type reFacData = {
  financialRecordId: number;
  financialRecordName: string;
  financialRecordDescription: string;
  imgId: string;
};

export const metadata: Metadata = {
  title: '가계부 수정',
  description: '가계부 수정 페이지입니다.',
};

export default function FaRecEditPage() {
  // test용 임의 지정
  const financialRecordId = 2;

  const { isLoading, isError, error, data, isSuccess } = useQuery<reFacData>(
    ['reFac'],
    () => APIfinancialRecord.getFaRec(financialRecordId),
    { staleTime: 1000 * 60 * 30 }
  );

  let financialRecordName, financialRecordDescription, imgId;
  if (data) {
    financialRecordName = data.financialRecordName;
    financialRecordDescription = data.financialRecordDescription;
    imgId = data.imgId;
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
      <h1 className='blind'>가계부 수정 페이지</h1>
      {isSuccess && (
        <FaRecForm
          pageType='edit'
          financialRecordId={financialRecordId}
          initialFaRecName={financialRecordName}
          initialFaRecDesc={financialRecordDescription}
          initialImage={imgId}
        />
      )}
    </>
  );
}

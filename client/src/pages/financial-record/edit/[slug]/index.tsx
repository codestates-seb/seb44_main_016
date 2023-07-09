import { useQuery } from '@tanstack/react-query';
import FaRecForm from '../../FaRecForm';
import { APIfinancialRecord } from '../../../../services/apiFinancial';

type reFacData = {
  financialRecordId: number;
  financialRecordName: string;
  financialRecordDescription: string;
  imgId: string;
};

export default function FaRecEditPage() {
  // test용 임의 지정
  const financialRecordId = 2;

  const { isLoading, error, data, isSuccess } = useQuery<reFacData>(
    ['reFac'],
    () => APIfinancialRecord.getFaRec(financialRecordId)
  );

  let financialRecordName, financialRecordDescription, imgId;
  if (data) {
    financialRecordName = data.financialRecordName;
    financialRecordDescription = data.financialRecordDescription;
    imgId = data.imgId;
  }

  return (
    <>
      <h1 className='blind'>가계부 수정 페이지</h1>
      {isLoading && <p>아직 로딩 중입니다.</p>}
      {error && <p>에러가 발생하였습니다.</p>}
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

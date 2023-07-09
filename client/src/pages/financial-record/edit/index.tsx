import FaRecForm from '../FaRecForm';

export default function FaRecEditPage() {
  // 테스트용
  const financialRecordId = 2;
  const initialFaRecName = '지상최강의햄스터햄구의 가계부';
  const initialFaRecDesc = '해바라기 한톨도 아껴야 잘 산다.';
  const initialImage =
    'https://i.namu.wiki/i/VxdEKDNZCp9hAW5TU5-3MZTePLGSdlYKzEZUyVLDB-Cyo950Ee19yaOL8ayxgJzEfMYfzfLcRYuwkmKEs2cg0w.webp';

  return (
    <>
      <h1 className='blind'>가계부 수정 페이지</h1>
      <FaRecForm
        pageType='edit'
        financialRecordId={financialRecordId}
        initialFaRecName={initialFaRecName}
        initialFaRecDesc={initialFaRecDesc}
        initialImage={initialImage}
      />
    </>
  );
}

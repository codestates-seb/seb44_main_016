import FaRecForm from '../FaRecForm';

export default function FaRecCreatePage() {
  return (
    <>
      <h1 className='blind'>가계부 추가 페이지</h1>
      <FaRecForm pageType='create' />
    </>
  );
}

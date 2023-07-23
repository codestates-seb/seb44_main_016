import { Metadata } from 'next';
import { PAGE_NAMES } from '../../../constants/pageNames';
import FaRecForm from '../FaRecForm';
import withAuth from '../../../components/WithAuth';

export const metadata: Metadata = {
  title: PAGE_NAMES.FINANCIAL_RECORD_CREATE,
  description: `${PAGE_NAMES.FINANCIAL_RECORD_CREATE} 페이지입니다.`,
};

function FaRecCreatePage() {
  return (
    <>
      <h1 className='blind'>{PAGE_NAMES.FINANCIAL_RECORD_CREATE} 페이지</h1>
      <FaRecForm pageType='create' />
    </>
  );
}

export default withAuth(FaRecCreatePage);

import FaRecForm from '../FaRecForm';
import withAuth from '../../../components/WithAuth';
import { FAREC_META_DATA } from '../../../constants/seo/faRecMetaData';
import HeadMeta from '../../../components/HeadMeta';

function FaRecCreatePage() {
  return (
    <>
      <HeadMeta
        title={FAREC_META_DATA.FINANCIAL_RECORD_CREATE_PAGE.TITLE}
        description={FAREC_META_DATA.FINANCIAL_RECORD_CREATE_PAGE.DESCRIPTION}
      />
      <FaRecForm pageType='create' />
    </>
  );
}

export default withAuth(FaRecCreatePage);

import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import apiUser from '../../../services/apiUser';
import Loading from '../../../components/Loading';
import UserUpdatePage from './UserUpdatePage';
import HeadMeta from '../../../components/HeadMeta';
import { USER_META_DATA } from '../../../constants/seo/userMetaData';

export default function UserUpdate() {
  const {
    isLoading: isMyInfoLoading,
    error: myInfoError,
    data: myInfoData,
  } = useQuery(['myInfo'], apiUser.getMyInfo);

  if (myInfoError) {
    toast.error('오류가 발생했습니다.');
    toast.info('다시 시도해주세요.');
  }

  return (
    <>
      <HeadMeta
        title={USER_META_DATA.USER_UPDATE_PAGE.TITLE}
        description={USER_META_DATA.USER_UPDATE_PAGE.DESCRIPTION}
      />
      {isMyInfoLoading ? <Loading /> : myInfoData && <UserUpdatePage myInfoData={myInfoData} />}
    </>
  );
}

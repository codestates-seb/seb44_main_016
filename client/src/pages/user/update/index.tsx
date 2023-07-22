import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import apiUser from '../../../services/apiUser';
import Loading from '../../../components/Loading';
import UserUpdatePage from './UserUpdatePage';
import HeadMeta from '../../../components/HeadMeta';
import { userMetaData } from '../../../constants/seo/userMetaData';

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
        title={userMetaData.userUpdatePage.title}
        description={userMetaData.userUpdatePage.description}
      />
      {isMyInfoLoading ? <Loading /> : myInfoData && <UserUpdatePage myInfoData={myInfoData} />}
    </>
  );
}

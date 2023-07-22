import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import apiUser from '../../../services/apiUser';
import Loading from '../../../components/Loading';
import UserUpdatePage from './UserUpdatePage';
import HeadMeta from '../../../components/HeadMeta';
import { metaData } from '../../../constants/metaDatas/metadata';

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
      <HeadMeta title={metaData.userUpdatePage.title} description={metaData.userUpdatePage.description} />
      {isMyInfoLoading ? <Loading /> : myInfoData && <UserUpdatePage myInfoData={myInfoData} />}
    </>
  );
}

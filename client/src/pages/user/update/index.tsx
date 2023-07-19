import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import apiUser from '../../../services/apiUser';
import Loading from '../../../components/Loading';
import { Metadata } from 'next';
import UserUpdatePage from './UserUpdatePage';

export const metadata: Metadata = {
  title: '회원 정보 수정 페이지',
  description: '프로필 사진, 닉네임, 비밀번호를 변경할 수 있습니다.',
};

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

  return <>{isMyInfoLoading ? <Loading /> : myInfoData && <UserUpdatePage myInfoData={myInfoData} />}</>;
}

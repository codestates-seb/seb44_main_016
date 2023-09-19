import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../redux/hooks';
import { login, logout } from '../redux/authnReducer';
import { useQuery } from '@tanstack/react-query';
import apiUser from '../../services/apiUser';
import useUserGlobalValue from '../redux/getUserInfo';
import { getAccessByRefresh } from './getAccessByRefresh';
import { toast } from 'react-toastify';

const withAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { accessToken } = useUserGlobalValue();
  const [changedAccessToken, setChangedAccessToken] = useState(accessToken);

  const { data: myInfoData } = useQuery(['userInfo'], apiUser.getUserInfo, {
    enabled: !!changedAccessToken,
  });

  const getAccessTokenAndUserInfo = async () => {
    if (!changedAccessToken) {
      const newAccessToken = await getAccessByRefresh();
      if (newAccessToken === null) {
        router.push('/');
        dispatch(logout());
        toast.error('로그인을 다시 해 주세요.');
      }
      setChangedAccessToken(newAccessToken);
    } else if (changedAccessToken && myInfoData) {
      const { userId, loginId, nickname, profileImgPath } = myInfoData;
      //prettier-ignore
      dispatch(login({userId,loginId, nickname, profileImgPath, accessToken: changedAccessToken, isLoggedIn: true}));
    }
  };

  useEffect(() => {
    getAccessTokenAndUserInfo();
  }, [myInfoData, changedAccessToken]);

  return;
};

export default withAuth;

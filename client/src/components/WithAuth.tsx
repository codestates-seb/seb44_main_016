import { useEffect, useState } from 'react';
import { ComponentType } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch } from './redux/hooks';
import { login, logout } from './redux/authnReducer';
import { useMutation, useQuery } from '@tanstack/react-query';
import apiUser from '../services/apiUser';
import useUserGlobalValue from './redux/getUserInfo';

const withAuth = (Component: ComponentType) => (props: object) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { accessToken } = useUserGlobalValue();
  console.log(`accessToken ${accessToken}`);
  const [changedAccessToken, setChangedAccessToken] = useState(accessToken);
  console.log(`changedAccessToken ${changedAccessToken}`);

  const { data: myInfoData } = useQuery(['userInfo'], apiUser.getUserInfo);

  /** refresh 토큰으로 새 access 토큰을 발급받는 api */
  const { mutate } = useMutation(apiUser.getNewAccess, {
    onSuccess: (data) => {
      console.log(data);
      const newAccessTokenWithBearer = data.headers.authorization;
      const newAccessToken = newAccessTokenWithBearer.split(' ')[1];
      setChangedAccessToken(newAccessToken);

      const refreshToken = data.headers.refresh;
      console.log(`withAuth ${refreshToken}`);
      localStorage.setItem('refreshToken', refreshToken);
    },
    onError: (err) => {
      // dispatch(logout()); 배포 직후 주석 제거
      // router.push('/');
      throw err;
    },
  });

  useEffect(() => {
    if (!changedAccessToken) {
      console.log('체인지 어세스가 없음!!');
      mutate();
    } else if (changedAccessToken && myInfoData) {
      console.log('둘다 있어!!');
      const { userId, loginId, nickname, profileImgPath } = myInfoData;
      dispatch(
        login({
          userId,
          loginId,
          nickname,
          accessToken: changedAccessToken,
          profileImgPath,
          isLoggedIn: true,
        })
      );
    }
  }, [changedAccessToken, myInfoData]);

  return <Component {...props} />;
};

export default withAuth;

import { useEffect, useState } from 'react';
import { ComponentType } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch } from './redux/hooks';
import { login, logout } from './redux/authnReducer';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiUser from '../services/apiUser';
import useUserGlobalValue from './redux/getUserInfo';

const withAuth = (Component: ComponentType) => (props: object) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { accessToken } = useUserGlobalValue();
  const [changedAccessToken, setChangedAccessToken] = useState(null);

  const { data: myInfoData } = useQuery(['userInfo'], apiUser.getUserInfo, { enabled: !!changedAccessToken });
  console.log(myInfoData);

  /** refresh 토큰으로 새 access 토큰을 발급받는 api */
  const { mutate } = useMutation(apiUser.getNewAccess, {
    onSuccess: (data) => {
      const newAccessTokenWithBearer = data.headers.authorization;
      const newAccessToken = newAccessTokenWithBearer.split(' ')[1];
      setChangedAccessToken(newAccessToken);
    },
    onError: (err) => {
      // dispatch(logout()); 배포 때 살릴 예정
      // router.push('/'); 배포 때 살릴 예정
      throw err;
    },
  });

  useEffect(() => {
    if (!accessToken) {
      mutate();
    } else if (changedAccessToken && myInfoData) {
      const { userId, loginId, nickname, profileImgPath } = myInfoData;
      console.log(profileImgPath);
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

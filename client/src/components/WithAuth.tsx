import { useEffect } from 'react';
import { ComponentType } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch } from './redux/hooks';
import { login, logout } from './redux/authnReducer';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiUser from '../services/apiUser';
import useAccessToken from './redux/getUserInfo';

const withAuth = (Component: ComponentType) => (props: object) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const accessToken = useAccessToken();
  // const accessToken = null; // accessToken 만료 test용 (배포 직전 삭제)

  const { data: myInfoData } = useQuery(['myInfo'], apiUser.getUserInfo);

  /** refresh 토큰으로 새 access 토큰을 발급받는 api */
  const { mutate } = useMutation(apiUser.getNewAccess, {
    onSuccess: (data) => {
      const newAccessTokenWithBearer = data.headers.authorization;
      const newAccessToken = newAccessTokenWithBearer.split(' ')[1];
      dispatch(login({ accessToken: newAccessToken, isLoggedIn: true }));
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
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      queryClient.invalidateQueries(['myInfo']);
    }

    if (myInfoData) {
      console.log('myInfoData있어.');
      console.log(myInfoData);
      const userId = myInfoData.data.userId;
      const loginId = myInfoData.data.loginId;
      const nickname = myInfoData.data.nickname;
      console.log(userId, loginId, nickname);
      dispatch(login({ userId, loginId, nickname }));
    }
  }, [accessToken, myInfoData]);

  return <Component {...props} />;
};

export default withAuth;

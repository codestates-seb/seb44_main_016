import { useEffect } from 'react';
import { ComponentType } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch } from './redux/hooks';
import { login, logout } from './redux/authnReducer';
import { useMutation } from '@tanstack/react-query';
import apiUser from '../services/apiUser';
import useAccessToken from '../utils/getAccessToken';

const withAuth = (Component: ComponentType) => (props: object) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const accessToken = useAccessToken();
  // const accessToken = null; // accessToken 만료 test용 (배포 직전 삭제)

  /** refresh 토큰으로 새 access 토큰을 발급받는 api */
  const { mutate } = useMutation(apiUser.getNewRefresh, {
    onSuccess: (data) => {
      const newAccessTokenWithBearer = data.headers.authorization;
      const newAccessToken = newAccessTokenWithBearer.split(' ')[1];
      dispatch(login({ accessToken: newAccessToken, isLoggedIn: true }));
    },
    onError: (err) => {
      dispatch(logout());
      // router.push('/'); 배포 때 살릴 예정
      throw err;
    },
  });

  useEffect(() => {
    if (!accessToken) {
      mutate();
    }
  }, []);

  return <Component {...props} />;
};

export default withAuth;

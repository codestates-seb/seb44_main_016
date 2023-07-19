import { useEffect } from 'react';
import { ComponentType } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch } from './redux/hooks';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { login, logout } from './redux/authnReducer';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import apiUser from '../services/apiUser';

const withAuth = (Component: ComponentType) => (props: object) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // let accessToken = useAccessToken();
  // let accessToken: any = null; //test
  // console.log(accessToken);
  // console.log('access 토큰이 존재함');

  // /** refresh 토큰으로 새 access 토큰을 발급받는 api */
  // const { mutate, isError, isSuccess } = useMutation(apiUser.getNewRefresh, {
  //   onSuccess: (data) => {
  //     accessToken = data.headers.authorization;
  //     console.log(accessToken);
  //     console.log('access 토큰이 교체됨');

  //     dispatch(login({ accessToken: accessToken, isLoggedIn: true }));
  //   },
  //   onError: (err) => {
  //     console.error(err);
  //   },
  // });

  // useEffect(() => {
  //   if (!accessToken) {
  //     mutate();
  //     if (isError) {
  //       console.log('access 토큰이 없음');
  //       toast.error('로그인 먼저 해주세요.');
  //       router.push('/user/login');
  //       dispatch(logout());
  //     } else if (isSuccess) {
  //       console.log('다시 받아옴');
  //       return;
  //     }
  //   }
  // }, []);

  return <Component {...props} />;
};

export default withAuth;

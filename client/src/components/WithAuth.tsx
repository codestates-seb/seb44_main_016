import { useEffect } from 'react';
import { ComponentType } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import { useAppDispatch } from './redux/hooks';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { login, logout } from './redux/authnReducer';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import apiUser from '../services/apiUser';

const withAuth = (Component: ComponentType) => async (props: object) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const accessToken = useSelector<RootState>((state) => state.authnReducer.login.accessToken);

  const refreshToken = getCookie('refreshToken');

  /** refresh 토큰으로 새 refresh 토큰과 access 토큰을 발급받는 api 추가 예정 */
  useEffect(() => {
    if (accessToken && typeof accessToken === 'string') {
      const fetchData = async () => {
        try {
          const { mutateAsync } = useMutation(() => apiUser.getNewRefresh(accessToken));
          const res = await mutateAsync();
          const newAccessToken = res.headers.Authorization;
          dispatch(login({ accessToken: newAccessToken, isLoggedIn: true }));
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }
  }, []);

  useEffect(() => {
    if (!refreshToken && !accessToken) {
      toast.error('로그인 먼저 해주세요.');
      router.push('/user/login');
      dispatch(logout());
    }
  }, []);

  return <Component {...props} />;
};

export default withAuth;

import { useEffect } from 'react';
import { ComponentType } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import { useAppDispatch } from './redux/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../components/redux/store';
import { login } from './redux/authnReducer';

const withAuthn = (Component: ComponentType) => (props: object) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const accessToken = useSelector<RootState>((state) => state.authnReducer.login.accessToken);
  const refreshToken = getCookie('refreshToken');

  /** refresh 토큰으로 새 refresh 토큰과 access 토큰을 발급받는 api 추가 예정 */
  if (accessToken) {
    dispatch(login({ accessToken: 'new-access-token', isLoggedIn: true }));
  }

  useEffect(() => {
    if (!refreshToken) {
      // access 추가 예정
      alert('로그인 먼저 해주세요.');
      router.push('/user/login');
    }
  }, []);

  return <Component {...props} />;
};

export default withAuthn;

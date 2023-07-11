import { useEffect } from 'react';
import { ComponentType } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import { useAppDispatch } from './redux/hooks';
import { login } from './redux/authnReducer';

const withAuthn = (Component: ComponentType) => (props: object) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const refreshToken = getCookie('refreshToken'); // 2주 동안 로그인이 유지됨
  console.log(refreshToken); // refresh 토큰으로 새 refreshToken, accessToken 발급 받아옴 (갱신)

  dispatch(login({ isLoggedIn: true }));

  useEffect(() => {
    if (!refreshToken) {
      alert('로그인 먼저 해주세요.');
      router.push('/user/login'); // 다시 refreshToken을 받아 옴 (2주)
    }
  }, []);

  return <Component {...props} />;
};

export default withAuthn;

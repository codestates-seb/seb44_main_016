import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface useCheckIsMyPageFirstParams {
  globalLoginId: string | undefined | null;
  loginId: string | string[] | undefined;
}

export const useCheckIsMyPageFirst = ({ loginId, globalLoginId }: useCheckIsMyPageFirstParams) => {
  const router = useRouter();
  useEffect(() => {
    if (loginId === globalLoginId) {
      router.push('/user/mypage');
      return;
    }
  }, [loginId, globalLoginId]);
};

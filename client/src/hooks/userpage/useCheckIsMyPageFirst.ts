import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface useCheckIsMyPageFirstParams {
  globalLoginId: string | undefined | null;
  userIdParam: string | string[] | undefined;
}

export const useCheckIsMyPageFirst = ({ userIdParam, globalLoginId }: useCheckIsMyPageFirstParams) => {
  const router = useRouter();
  const isMyPage = userIdParam === globalLoginId;

  useEffect(() => {
    if (isMyPage) {
      router.push('/user/mypage');
      return;
    }
  }, [userIdParam, globalLoginId]);

  return { isMyPage };
};

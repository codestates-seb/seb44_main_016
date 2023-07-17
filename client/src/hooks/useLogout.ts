import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export const useMutateLogOut = (mutateFunction: () => Promise<void>) => {
  const router = useRouter();
  const { mutate, data } = useMutation(['logout'], mutateFunction, {
    onSuccess: () => {
      router.push('/user/login');
      toast.success('로그아웃 되었습니다.');
    },
  });

  return { LogOutMutate: mutate, data };
};

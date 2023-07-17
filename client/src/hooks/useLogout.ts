import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../components/redux/hooks';
import { logout } from '../components/redux/authnReducer';

export const useMutateLogOut = (mutateFunction: () => Promise<void>) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { mutate, data } = useMutation(['logout'], mutateFunction, {
    onSuccess: () => {
      dispatch(logout());
      router.push('/');
      toast.success('로그아웃 되었습니다.');
    },
  });

  return { LogOutMutate: mutate, data };
};

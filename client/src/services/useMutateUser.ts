import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../components/redux/hooks';
import { login, logout } from '../components/redux/authnReducer';
import { AxiosResponse } from 'axios';
import { LoginReqData, OAuthReqData, PostSignUp, UserUpdateReqData } from '../types/user';
import { changeImgSrc } from '../components/redux/currentImgReducer';

interface LoginErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}

const useMutateUser = {
  signUp: (mutateFunction: (signUpData: PostSignUp) => Promise<AxiosResponse>) => {
    const router = useRouter();
    const { mutate, data } = useMutation(['signUp'], mutateFunction, {
      onSuccess: (data) => {
        if (data.status === 201) {
          toast.success('회원가입에 성공했습니다.');
          toast.info('로그인을 해 주세요.');
          router.push('/user/login');
        }
      },

      onError: (error: LoginErrorResponse) => {
        if (error.response.data.message) {
          toast.error(error.response.data.message);
          return;
        }
      },
    });
    return { SignUpMutate: mutate, data };
  },

  login: (mutateFunction: (loginData: LoginReqData | OAuthReqData) => Promise<AxiosResponse>) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { mutate, data } = useMutation(['login'], mutateFunction, {
      onSuccess: (data) => {
        console.log(data);
        if (data.status === 200) {
          const accessTokenWithBearer = data.headers.authorization;
          const accessToken = accessTokenWithBearer.split(' ')[1];

          const refreshToken = data.headers.refresh;
          localStorage.setItem('refreshToken', refreshToken);

          const { userId, loginId, nickname, profileImgPath } = data.data;
          dispatch(login({ accessToken, userId, loginId, nickname, profileImgPath, isLoggedIn: true }));

          toast(`${nickname}님, 환영합니다!`);
          router.push(`/`);
        }
      },

      onError: (error: LoginErrorResponse) => {
        if (error.response.data.message) {
          toast.error(error.response.data.message);
          return;
        }
        toast.error('로그인에 실패했습니다.');
      },
    });
    return { LoginMutate: mutate, data };
  },

  logout: (mutateFunction: () => Promise<AxiosResponse>) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { mutate } = useMutation(['logout'], mutateFunction, {
      onSuccess: () => {
        dispatch(logout());
        window.location.reload();
        router.push('/');
        toast.success('로그아웃 되었습니다.');
      },

      onError: () => {
        toast.error('로그아웃에 실패했습니다.');
      },
    });
    return { LogOutMutate: mutate };
  },

  update: (mutateFunction: (userUpdateData: UserUpdateReqData) => Promise<AxiosResponse>) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();

    const { mutate, data } = useMutation(['update'], mutateFunction, {
      onSuccess: () => {
        toast.success('회원 정보가 수정되었습니다.');
        dispatch(changeImgSrc({ currentImgSrc: '', isAvatar: false }));
        queryClient.invalidateQueries(['myInfo']);
        router.push(`/user/mypage`);
      },

      onError: () => {
        toast.error('회원 정보 수정에 실패했습니다.');
      },
    });
    return { updateUserMutate: mutate, data };
  },

  delete: (mutateFunction: (password: string) => Promise<AxiosResponse>) => {
    const router = useRouter();
    const { mutate, data } = useMutation(['delete'], mutateFunction, {
      onSuccess: () => {
        const deletePageURL = router.asPath;
        localStorage.setItem('deletePageURL', deletePageURL);
        router.push('/user/delete/goodbye');
      },

      onError: () => {
        toast.error('회원 탈퇴에 실패했습니다.');
      },
    });
    return { deleteUserMutate: mutate, data };
  },
};

export default useMutateUser;

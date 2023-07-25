import { useSelector } from 'react-redux';
import { RootState } from './store';
import { LoginResData } from '../../types/user';

export default function useUserGlobalValue(): LoginResData {
  const userId = useSelector<RootState, number | null | undefined>(
    (state) => state.authnReducer.login.userId
  );
  const accessToken = useSelector<RootState, string | null | undefined>(
    (state) => state.authnReducer.login.accessToken
  );
  const loginId = useSelector<RootState, string | null | undefined>(
    (state) => state.authnReducer.login.loginId
  );
  const profileImgPath = useSelector<RootState, string | null | undefined>(
    (state) => state.authnReducer.login.profileImgPath
  );
  const nickname = useSelector<RootState, string | null | undefined>(
    (state) => state.authnReducer.login.nickname
  );
  const isLoggedIn = useSelector<RootState, boolean | undefined>(
    (state) => state.authnReducer.login.isLoggedIn
  );
  return { userId, accessToken, loginId, nickname, isLoggedIn };
}

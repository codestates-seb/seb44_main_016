import { useSelector } from 'react-redux';
import { RootState } from './store';
import { LoginResData } from '../../types/user';

export default function useUserGlobalValue(): LoginResData {
  const { userId, accessToken, loginId, profileImgPath, nickname, isLoggedIn } = useSelector<
    RootState,
    LoginResData
  >((state) => state.authnReducer.login);

  return { userId, accessToken, loginId, nickname, profileImgPath, isLoggedIn };
}

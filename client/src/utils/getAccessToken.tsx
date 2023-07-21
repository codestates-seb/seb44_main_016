import { useSelector } from 'react-redux';
import { RootState } from '../components/redux/store';

export default function useAccessToken() {
  const accessToken = useSelector<RootState>((state) => state.authnReducer.login.accessToken);
  return accessToken;
}

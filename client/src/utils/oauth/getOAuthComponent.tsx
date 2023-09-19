import Naver from '../../../public/images/icon/oauth/naver.svg';
import Kakao from '../../../public/images/icon/oauth/kakao.svg';
import Google from '../../../public/images/icon/oauth/google.svg';

export const getOauthComponent = (name: string) => {
  let icon = null;
  switch (name) {
    case '네이버':
      icon = <Naver width='55' aria-hidden={true} />;
      break;
    case '카카오':
      icon = <Kakao width='55' aria-hidden={true} />;
      break;
    case '구글':
      icon = <Google width='55' aria-hidden={true} />;
      break;
    default:
      break;
  }
  return icon;
};

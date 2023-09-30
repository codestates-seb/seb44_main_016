export const OAUTH = {
  NAVER_CLIENT_ID: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
  NAVER_CLIENT_SECRET: process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET,
  KAKAO_API_KEY: process.env.NEXT_PUBLIC_KAKAO_API_KEY,
  GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
};

const RedirectURL = (name: string) => {
  return `https://www.zerohip.co.kr/oauth/${name}`;
};

export const naverRedirectURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
  OAUTH.NAVER_CLIENT_ID
}&state=${OAUTH.NAVER_CLIENT_SECRET}&redirect_uri=${RedirectURL('naver')}`;

export const kakaoRedirectURL = `https://kauth.kakao.com/oauth/authorize?client_id=${
  OAUTH.KAKAO_API_KEY
}&redirect_uri=${RedirectURL('kakao')}&response_type=code`;

export const googleRedirectURL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${
  OAUTH.GOOGLE_CLIENT_ID
}&scope=openid%20profile%20email&redirect_uri=${RedirectURL('google')}`;

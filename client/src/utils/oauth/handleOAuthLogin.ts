import { LoginReqData, OAuthReqData } from '../../types/user';

interface handleOAuthLoginProps {
  name: string;
  code: string | null;
  clientId: string | undefined;
  clientSecret?: string | undefined;
  state?: string | null;
  LoginMutate: (loginData: LoginReqData | OAuthReqData) => void;
}

export const handleOAuthLogin = ({
  name,
  code,
  clientId,
  clientSecret,
  state,
  LoginMutate,
}: handleOAuthLoginProps) => {
  if (code && clientId) {
    const oAuthData = {
      code,
      clientId,
      ...(clientSecret && { clientSecret }),
      ...(state && { state }),
    };

    const targetOAuth = name;
    const oAuthReqBody = { oAuthData, targetOAuth };
    LoginMutate(oAuthReqBody);
  }
};

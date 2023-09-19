import styled from '@emotion/styled';
import { getOauthComponent } from '../../../utils/oauth/getOAuthComponent';

interface OAuthProps {
  name: string;
  handleLogin: () => void;
}

export default function OAuthBtn({ name, handleLogin }: OAuthProps) {
  const icon = getOauthComponent(name);

  return (
    <S.OauthLoginBtn name={name} type='button' onClick={handleLogin}>
      {icon}
      <div>{`${name}`}로 시작하기</div>
    </S.OauthLoginBtn>
  );
}

const S = {
  OauthLoginBtn: styled.button`
    width: 100%;
    height: 55px;
    background-color: ${(props) =>
      props.name === '네이버' ? '#06be34' : props.name === '카카오' ? '#ffeb3b' : 'white'};
    color: ${(props) => props.name === '네이버' && 'white'};
    border-radius: 10px;
    display: flex;
    align-items: center;
    margin-bottom: ${(props) => (props.name === '네이버' || props.name === '카카오') && '7px'};
    > div {
      margin-left: 3px;
    }
  `,
};

import React from 'react'; // useState 사용
import styled from '@emotion/styled';
import SvgBox from './SvgBox';

/* type은 추후 다른 파일로 분리하고 Import할 예정 */
type Props = {
  leftIcon?: JSX.Element; // <svg>
  rightIcon?: JSX.Element; // <svg>
  isSmall?: boolean;
  isReverse?: boolean;
  children?: string | false;
  onClick?: () => void;
  onClickRight?: () => void;
};

export default function AsideButton(props: Props) {
  return (
    <S.AsideButtonContainer isSmall={props.isSmall}>
      <S.AsideInnerButtonLeft onClick={props.onClick}>
        <SvgBox>{props.leftIcon || <></>}</SvgBox>
        {props.children ? <S.Text>{props.children}</S.Text> : <></>}
      </S.AsideInnerButtonLeft>
      {props.children && (
        <S.AsideInnerButtonRight onClick={props.onClick || props.onClickRight}>
          <SvgBox isReverse={!props.isReverse}>
            {props.rightIcon || <></>}
          </SvgBox>
        </S.AsideInnerButtonRight>
      )}
    </S.AsideButtonContainer>
  );
}

const S = {
  AsideButtonContainer: styled.div<{ isSmall?: boolean }>`
    width: 100%;
    height: ${(props) => (props.isSmall ? '2.75rem' : '3.25rem')};
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:hover {
      filter: brightness(0.9);
    }
  `,
  AsideInnerButtonLeft: styled.button`
    width: 100%;
    height: 100%;
    padding: 0rem 1rem;
    flex-shrink: 1;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  `,
  Text: styled.span``,
  AsideInnerButtonRight: styled.button`
    width: ${(props) => props.onClick && '3rem'};
    height: 100%;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

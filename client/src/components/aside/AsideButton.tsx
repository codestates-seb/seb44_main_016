import React from 'react'; // useState 사용
import styled from '@emotion/styled';
import Link from 'next/link';

import SvgBox from './SvgBox';

/* type은 추후 다른 파일로 분리하고 Import할 예정 */
type Props = {
  className?: string;
  href?: string;
  leftIcon?: JSX.Element; // <svg>
  rightIcon?: JSX.Element; // <svg>
  isSmall?: boolean;
  isReverse?: boolean;
  children?: string | false;
  onClick?: () => void;
  onClickRight?: () => void;
};

export default function AsideButton(props: Props) {
  const isShrinkOrMobile = ['shrink', 'mobile'].includes(props.className || '');

  const onClickLeft = (e: MouseEvent) => {
    e.preventDefault(); // 알림/검색 버튼을 누르면 화면이 맨 위로 스크롤되는 버그 수정
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <S.AsideButtonContainer isSmall={props.isSmall}>
      <S.AsideInnerButtonLeft href={props.href || ''} onClick={onClickLeft}>
        <SvgBox>{props.leftIcon || <></>}</SvgBox>
        {isShrinkOrMobile ? <></> : <S.Text>{props.children}</S.Text>}
      </S.AsideInnerButtonLeft>
      {isShrinkOrMobile || props.rightIcon === undefined ? (
        <></>
      ) : (
        <S.AsideInnerButtonRight onClick={onClickLeft || props.onClickRight}>
          <SvgBox isReverse={!props.isReverse}>{props.rightIcon || <></>}</SvgBox>
        </S.AsideInnerButtonRight>
      )}
    </S.AsideButtonContainer>
  );
}

const S = {
  AsideButtonContainer: styled.div<{ isSmall?: boolean }>`
    width: 100%;
    height: ${(props) => (props.isSmall ? '2.75rem' : '3.25rem')};
    font-size: ${(props) => (props.isSmall ? '0.9rem' : '1rem')};
    font-weight: ${(props) => (props.isSmall ? '400' : '500')};
    color: ${(props) => (props.isSmall ? 'var(--color-gray01);' : 'black')};
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:hover {
      filter: brightness(0.9);
    }
  `,
  AsideInnerButtonLeft: styled(Link)`
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

    &:hover::before {
      content: '';
      position: absolute;
      width: 2rem;
      height: 2rem;
      border-radius: var(--rounded-full);
      background-color: var(--color-gray08);
    }
  `,
};

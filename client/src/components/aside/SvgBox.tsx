// import React from 'react'; // useState 사용
import styled from '@emotion/styled';

/* type은 추후 다른 파일로 분리하고 Import할 예정 */
type Props = {
  isReverse?: boolean;
  children?: JSX.Element; // <svg>
};

export default function SvgBox(props: Props) {
  return <S.SvgContainer isReverse={props.isReverse}>{props.children || <></>}</S.SvgContainer>;
}

type SvgContainerProps = {
  isReverse?: boolean;
};

const S = {
  SvgContainer: styled.div<SvgContainerProps>`
    width: 3rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    transform: ${(props) => (props.isReverse ? 'rotate(180deg)' : 'rotate(0deg)')};
  `,
};

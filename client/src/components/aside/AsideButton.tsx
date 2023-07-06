import React from 'react'; // useState 사용
import styled from '@emotion/styled';
import SvgBox from './SvgBox';

/* type은 추후 다른 파일로 분리하고 Import할 예정 */
type Props = {
  leftIcon?: JSX.Element; // <svg>
  dropdownIcon?: JSX.Element; // <svg>
  isSmall?: boolean;
  isReverse?: boolean;
  children: string;
  onClick?: () => void;
};

export default function AsideButton(props: Props) {
  return (
    <S.AsideButtonContainer isSmall={props.isSmall} onClick={props.onClick}>
      <S.AsideButtonLeftSection>
        <SvgBox>{props.leftIcon || <></>}</SvgBox>
        <span>{props.children}</span>
      </S.AsideButtonLeftSection>
      <S.AsideButtonRightSection>
        <SvgBox isReverse={props.isReverse}>
          {props.dropdownIcon || <></>}
        </SvgBox>
      </S.AsideButtonRightSection>
    </S.AsideButtonContainer>
  );
}

type AsideButtonContainerProps = {
  isSmall?: boolean;
};

const S = {
  AsideButtonContainer: styled.button<AsideButtonContainerProps>`
    width: 100%;
    height: ${(props) => (props.isSmall ? '2.75rem' : '3.25rem')};
    background-color: white;
    padding: 0rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    &:hover {
      filter: brightness(0.9);
    }
  `,
  AsideButtonLeftSection: styled.section`
    display: flex;
    align-items: center;
    gap: 0.5rem;
  `,
  AsideButtonRightSection: styled.section`
    display: flex;
    align-items: center;
  `,
};

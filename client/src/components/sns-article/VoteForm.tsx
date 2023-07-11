import styled from '@emotion/styled';

type Props = {
  savingRate: number;
  flexRate: number;
};

// 양수: 1 반환, 0: 0 반환, 음수: -1 반환
const checkSign = (num: number): number => (num > 0 ? 1 : num < 0 ? -1 : 0);

export default function VoteFormComponent(props: Props) {
  const sign = checkSign(props.savingRate - props.flexRate);

  const SavingRateCount = styled(S.SavingRateCount)`
    ${sign >= 0 ? 'font-weight: bold' : ''}
  `;
  const FlexRateCount = styled(S.FlexRateCount)`
    ${sign <= 0 ? 'font-weight: bold' : ''}
  `;

  return (
    <S.VoteForm>
      <SavingRateCount>{props.savingRate}</SavingRateCount>
      <S.SavingBtn>👍절약</S.SavingBtn>
      <S.FlexBtn>💸Flex</S.FlexBtn>
      <FlexRateCount>{props.flexRate}</FlexRateCount>
    </S.VoteForm>
  );
}

const S = {
  VoteForm: styled.form`
    width: 100%;
    gap: 10px;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  SavingRateCount: styled.span`
    width: 100%;
    text-align: end;
    color: var(--color-point-blue);
  `,
  FlexRateCount: styled.span`
    width: 100%;
    color: var(--color-point-red);
  `,
  SavingBtn: styled.button`
    width: 90px;
    height: 40px;
    background-color: var(--color-point-blue);
    border-radius: 9999px;
    color: white;
    flex-shrink: 0;
    &:hover {
      filter: brightness(0.9);
    }
  `,
  FlexBtn: styled.button`
    width: 90px;
    height: 40px;
    background-color: var(--color-point-red);
    border-radius: 9999px;
    color: white;
    flex-shrink: 0;
    &:hover {
      filter: brightness(0.9);
    }
  `,
};

/*
  SavingBtn:
    border-point-blue border-solid border-[3px]
    hover:(bg-white text-point-blue font-bold)
  `),
  FlexBtn:
    border-point-red border-solid border-[3px]
    hover:(bg-white text-point-red font-bold)
  `),
*/

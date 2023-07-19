import styled from '@emotion/styled';

type Props = {
  savingCount: number;
  flexCount: number;
};

// 양수: 1 반환, 0: 0 반환, 음수: -1 반환
const checkSign = (num: number): number => (num > 0 ? 1 : num < 0 ? -1 : 0);

export default function VoteFormComponent(props: Props) {
  const sign = checkSign(props.savingCount - props.flexCount);

  const SavingCount = styled(S.SavingCount)`
    ${sign >= 0 ? 'font-weight: bold' : ''}
  `;
  const FlexCount = styled(S.FlexCount)`
    ${sign <= 0 ? 'font-weight: bold' : ''}
  `;

  return (
    <S.VoteForm>
      <SavingCount>{props.savingCount}</SavingCount>
      <S.SavingBtn>👍절약</S.SavingBtn>
      <S.FlexBtn>💸Flex</S.FlexBtn>
      <FlexCount>{props.flexCount}</FlexCount>
    </S.VoteForm>
  );
}

const S = {
  VoteForm: styled.form`
    width: 100%;
    gap: 0.625rem;
    margin-top: 0.625rem;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  SavingCount: styled.span`
    width: 100%;
    text-align: end;
    color: var(--color-point-blue);
  `,
  FlexCount: styled.span`
    width: 100%;
    color: var(--color-point-red);
  `,

  SavingBtn: styled.button`
    width: 5.5rem;
    height: 2.5rem;
    background-color: var(--color-point-blue);
    border-radius: var(--rounded-full);
    color: white;
    flex-shrink: 0;
    &:hover {
      filter: brightness(0.9);
    }
  `,
  FlexBtn: styled.button`
    width: 5.5rem;
    height: 2.5rem;
    background-color: var(--color-point-red);
    border-radius: var(--rounded-full);
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

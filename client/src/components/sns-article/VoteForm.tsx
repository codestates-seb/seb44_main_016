import React from 'react'; // useState 사용
import styled from '@emotion/styled';
import axios from 'axios';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { APISns, APIVote } from '../../services/apiSns';
import { VoteType } from '../../types/article';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

type Props = {
  feedArticleId: number;
};

export default function VoteFormComponent(props: Props) {
  const { data, isLoading, isError } = useQuery<VoteType, Error>(['vote', props.feedArticleId], () =>
    APIVote.getVote(props.feedArticleId)
  );

  const [savingCount, setSavingCount] = React.useState(0);
  const [flexCount, setFlexCount] = React.useState(0);

  // 데이터를 가져온 후, 상태에 반영
  React.useEffect(() => {
    if (data) {
      setSavingCount(data.savingCount);
      setFlexCount(data.flexCount);
    }
  }, [data]);

  const handleBtnClick = async (e: React.MouseEvent<HTMLButtonElement>, voteType: 'SAVING' | 'FLEX') => {
    e.preventDefault();
    try {
      APIVote.postVote(props.feedArticleId, voteType);
      const voteData = await APIVote.getVote(props.feedArticleId);
      setSavingCount(voteData.savingCount);
      setFlexCount(voteData.flexCount);
    } catch (error) {}
  };

  return (
    <S.VoteForm>
      <S.SavingCount>{savingCount}</S.SavingCount>
      <S.SavingBtn onClick={(e) => handleBtnClick(e, 'SAVING')}>👍 절약</S.SavingBtn>
      <S.FlexBtn onClick={(e) => handleBtnClick(e, 'FLEX')}>💸 Flex</S.FlexBtn>
      <S.FlexCount>{flexCount}</S.FlexCount>
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

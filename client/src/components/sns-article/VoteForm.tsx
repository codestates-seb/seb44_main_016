import React from 'react'; // useState 사용
import styled from '@emotion/styled';
import axios from 'axios';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { VoteType } from '../../types/article';

async function getVote(feedArticleId: number) {
  const res = await axios.get(`https://www.zerohip.co.kr/feedArticles/${feedArticleId}/vote`);
  const voteData: VoteType = res.data;
  return voteData;
}
type Props = {
  feedArticleId: number;
};

// 양수: 1 반환, 0: 0 반환, 음수: -1 반환
const checkSign = (num: number): number => (num > 0 ? 1 : num < 0 ? -1 : 0);

export default function VoteFormComponent(props: Props) {
  const { data, isLoading, isError } = useQuery<VoteType, Error>(['vote', props.feedArticleId], () =>
    getVote(props.feedArticleId)
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

  const handleBtnClick = async (e: React.MouseEvent<HTMLButtonElement>, pushed: 'saving' | 'flex') => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `https://www.zerohip.co.kr/feedArticles/${props.feedArticleId}/vote?pushed=${pushed}`
      );
      setSavingCount(res.data.savingCount);
      setFlexCount(res.data.flexCount);
    } catch (error) {}
  };

  return (
    <S.VoteForm>
      <S.SavingCount>{savingCount}</S.SavingCount>
      <S.SavingBtn onClick={(e) => handleBtnClick(e, 'saving')}>👍 절약</S.SavingBtn>
      <S.FlexBtn onClick={(e) => handleBtnClick(e, 'flex')}>💸 Flex</S.FlexBtn>
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

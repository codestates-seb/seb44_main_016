import React from 'react';

import tw from 'twin.macro';
import styled from '@emotion/styled';

import CommonStyles from '../../styles/CommonStyles';
import Comment from './snsarticle/Comment';

const S = {
  ...CommonStyles,
  ArticleHeader: styled.section(
    tw`w-full h-[58px] flex items-center justify-between px-[20px] `
  ),
  /* ArticleHeader 내부 컴포넌트 */
  Profile: styled.section(tw`flex justify-center gap-[10px]`),
  Nickname: styled.button(tw`font-bold`),
  ProfileImgButton: styled.button(
    tw`w-[40px] h-[40px] rounded-full overflow-hidden shrink-0`
  ),
  ProfileImg: styled.img(tw`w-full h-full bg-black `),
  CreatedAt: styled.section(tw``),
  ImgContainer: styled.section(tw`w-full h-[328px] bg-pink-500`),

  ArtileMain: styled.section(tw`w-full p-[20px]  flex flex-col gap-[20px]`),
  /* ArtileMain 내부 컴포넌트 */
  VoteForm: styled.form(
    tw`w-full flex justify-center items-center gap-[10px] mt-[10px]`
  ),
  OtherButtonsContainer: styled.section(tw`w-full flex justify-end gap-[10px]`),
  SavingRateCount: styled.span(tw`text-point-blue font-bold`),
  FlexRateCount: styled.span(tw`text-point-red`),
  /** 댓글 관련 **/
  CommentsContainer: styled.section(tw``),
  CommentsDropdownButton: styled.button(
    tw`w-full h-[35px] bg-[#F6F6F6] text-left rounded-[50px] px-[20px]`
  ),
  CommentList: styled.ol(tw`flex flex-col`),
  CommentForm: styled.form(tw`mt-[20px]`),
};

const SnsArticleContainer = tw.article`
w-[713px]
flex flex-col items-end
`;

const LabelTemplate = tw.section`
w-[116px] h-[37px] bg-white shadow-md font-bold 
rounded-t-[5px]  border-0 border-solid border-t-[3px] 
flex items-center justify-center
`;

const Box = tw.section`
w-full bg-white shadow-md
rounded-tl-default rounded-bl-default rounded-br-default
`;

const SavingBtn = tw.button`
w-[90px] h-[40px] bg-point-blue rounded-full text-white
 border-point-blue border-solid border-[3px]
hover:(bg-white text-point-blue font-bold)
`;
const FlexBtn = tw.button`
w-[90px] h-[40px] bg-point-red rounded-full text-white
 border-point-red border-solid border-[3px]
hover:(bg-white text-point-red font-bold)
`;

function getKoreanDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours().toString().padStart(2, '0'); // 한 자릿수라면 앞에 0 추가
  const minutes = date.getMinutes().toString().padStart(2, '0'); // 한 자릿수라면 앞에 0 추가

  const formattedDate = `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
  return formattedDate;
}

type Props = {
  data: {
    feedArticleId: number;
    feedType: number; // 사용
    content: string; // 사용
    createdAt: Date; // 사용
    modifiedAt: Date;
    imageId: number;
    userId: number;
    voteId: number;
    feedArticleHashtagId: number;
  };
};

export default function EditorPage({ data }: Props) {
  const [isCommentsOpened, setIsCommentsOpened] = React.useState(false);

  const labelText = data.feedType === 1 ? '절약 팁' : '허락해줘!';
  const Label =
    data.feedType === 1
      ? tw(LabelTemplate)`text-point-blue border-point-blue`
      : tw(LabelTemplate)`text-point-yellow border-point-yellow`;

  const handleChangeOpenedOrClosed = () => {
    setIsCommentsOpened((prevBool) => !prevBool);
  };

  return (
    <SnsArticleContainer>
      <Label>{labelText}</Label>
      <Box>
        <S.ArticleHeader>
          <S.Profile>
            <S.ProfileImgButton>
              <S.ProfileImg />
            </S.ProfileImgButton>
            <S.Nickname>Waypil</S.Nickname>
          </S.Profile>
          <S.CreatedAt>{getKoreanDate(data.createdAt)}</S.CreatedAt>
        </S.ArticleHeader>
        <S.ImgContainer></S.ImgContainer>
        <S.ArtileMain>
          <p>{data.content}</p>
          <S.VoteForm>
            <S.SavingRateCount>256</S.SavingRateCount>
            <SavingBtn>👍절약</SavingBtn>
            <FlexBtn>💸Flex</FlexBtn>
            <S.FlexRateCount>48</S.FlexRateCount>
          </S.VoteForm>
          <S.OtherButtonsContainer>
            <button>수정</button>
            <button>삭제</button>
          </S.OtherButtonsContainer>
          <S.CommentsContainer>
            <S.CommentsDropdownButton onClick={handleChangeOpenedOrClosed}>
              댓글 12개 모두 보기
            </S.CommentsDropdownButton>
            {isCommentsOpened ? (
              <S.CommentList>
                <Comment>다람쥐 헌 쳇바퀴에 타고파.</Comment>
                <Comment>
                  댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글
                  댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글
                </Comment>
              </S.CommentList>
            ) : (
              <></>
            )}
            <S.CommentForm>
              <S.InputText placeholder='댓글을 입력하세요'></S.InputText>
            </S.CommentForm>
          </S.CommentsContainer>
        </S.ArtileMain>
      </Box>
    </SnsArticleContainer>
  );
}

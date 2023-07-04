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
    tw`w-[40px] h-[40px] rounded-[50px] overflow-hidden shrink-0`
  ),
  ProfileImg: styled.img(tw`w-full h-full bg-black `),
  CreatedAt: styled.section(tw``),
  ImgContainer: styled.section(tw`w-full h-[328px] bg-pink-500`),

  ArtileMain: styled.section(tw`w-full p-[20px]  flex flex-col gap-[20px]`),
  /* ArtileMain 내부 컴포넌트 */
  VoteForm: styled.form(tw`w-full flex justify-center items-center gap-[10px]`),
  OtherButtonsContainer: styled.section(tw`w-full flex justify-end gap-[10px]`),
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

const Label = tw.section`
w-[116px] h-[37px] bg-white shadow-md font-bold text-[#537FEE]
rounded-t-[5px]  border-0 border-solid border-t-[3px] border-[#537FEE]
flex items-center justify-center
`;

const Box = tw.section`
w-full bg-white shadow-md
rounded-tl-[10px] rounded-bl-[10px] rounded-br-[10px]
`;

export default function EditorPage() {
  return (
    <SnsArticleContainer>
      <Label>절약 팁</Label>
      <Box>
        <S.ArticleHeader>
          <S.Profile>
            <S.ProfileImgButton>
              <S.ProfileImg />
            </S.ProfileImgButton>
            <S.Nickname>Waypil</S.Nickname>
          </S.Profile>
          <S.CreatedAt>2023년 6월 30일</S.CreatedAt>
        </S.ArticleHeader>
        <S.ImgContainer></S.ImgContainer>
        <S.ArtileMain>
          <p>
            본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문
          </p>
          <S.VoteForm>
            <span>256</span>
            <button>👍절약</button>
            <button>💸Flex</button>
            <span>48</span>
          </S.VoteForm>
          <S.OtherButtonsContainer>
            <button>수정</button>
            <button>삭제</button>
          </S.OtherButtonsContainer>
          <S.CommentsContainer>
            <S.CommentsDropdownButton>
              댓글 12개 모두 보기
            </S.CommentsDropdownButton>
            <S.CommentList>
              <Comment>다람쥐 헌 쳇바퀴에 타고파.</Comment>
              <Comment>
                댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글
                댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글
              </Comment>
            </S.CommentList>
            <S.CommentForm>
              <S.InputText placeholder='댓글을 입력하세요'></S.InputText>
            </S.CommentForm>
          </S.CommentsContainer>
        </S.ArtileMain>
      </Box>
    </SnsArticleContainer>
  );
}

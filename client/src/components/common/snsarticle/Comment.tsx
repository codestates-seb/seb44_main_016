import React from 'react';

import tw from 'twin.macro';
import styled from '@emotion/styled';

const S = {
  CommentContainer: styled.li(
    tw`w-full p-[20px]
    border-0 border-solid border-b-[3px] border-gray-200
    flex justify-between items-center `
  ),
  LeftDiv: styled.div(tw`flex gap-[10px]`),

  LikeButtonContainer: styled.div(tw` pl-[15px]`),

  ProfileImgButton: styled.button(
    tw`w-[40px] h-[40px] rounded-full overflow-hidden shrink-0`
  ),
  ProfileImg: styled.img(tw`w-full h-full bg-black `),
  Texts: styled.div(tw`flex flex-col gap-[10px]`),

  Upper: styled.p(tw`flex gap-[10px]`),
  Nickname: styled.button(tw`font-bold mr-[10px]`),
  CommentText: styled.span(tw``),

  Lower: styled.p(tw`flex gap-[10px]`),
  CreatedAt: styled.span(tw``),
  LikeCount: styled.span(tw``),
  AddReplyButton: styled.button(tw``),
  ReportButton: styled.button(tw``),

  LikeButton: styled.button(tw``),
};
// '더 보기' 버튼 구현 요망

type Props = {
  children?: string;
};

export default function CommentComponent(props: Props) {
  return (
    <S.CommentContainer>
      <S.LeftDiv>
        <S.ProfileImgButton>
          <S.ProfileImg />
        </S.ProfileImgButton>
        <S.Texts>
          <S.Upper>
            <S.CommentText>
              <S.Nickname>waypil</S.Nickname>
              <span>{props.children}</span>
            </S.CommentText>
          </S.Upper>
          <S.Lower>
            <S.CreatedAt>1주</S.CreatedAt>
            <S.LikeCount>좋아요 805개</S.LikeCount>
            <S.AddReplyButton>답글 달기</S.AddReplyButton>
            <S.ReportButton>신고</S.ReportButton>
          </S.Lower>
        </S.Texts>
      </S.LeftDiv>
      <S.LikeButtonContainer>
        <S.LikeButton>♡</S.LikeButton>
      </S.LikeButtonContainer>
    </S.CommentContainer>
  );
}

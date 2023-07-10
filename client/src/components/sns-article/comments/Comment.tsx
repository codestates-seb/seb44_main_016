import React from 'react';
import styled from '@emotion/styled';

type Props = {
  isMe?: boolean; // 댓글 작성자가 자기 자신이면 true
  children?: string;
};

export default function CommentComponent(props: Props) {
  const [isLike, setIsLike] = React.useState(false);

  const handleChangeIsLike = () => {
    setIsLike((prevBool) => !prevBool);
  };

  return (
    <S.CommentContainer>
      <S.LeftDiv>
        <S.ProfileImgButton>
          <S.ProfileImg />
        </S.ProfileImgButton>
        <S.Texts>
          <S.UpperTexts>
            <S.Nickname>waypil</S.Nickname>
            <span>{props.children}</span>
          </S.UpperTexts>
          <S.LowerTexts>
            <span>1주</span> {/* CreatedAt */}
            <span>좋아요 805개</span> {/* LikeCount */}
            <button>답글 달기</button> {/* AddReplyButton */}
            {props.isMe ? (
              <>
                <button>수정</button>
                <button>삭제</button>
              </>
            ) : (
              <>
                <button>신고</button> {/* ReportButton */}
              </>
            )}
          </S.LowerTexts>
        </S.Texts>
      </S.LeftDiv>
      <S.LikeButtonContainer>
        <S.LikeButton isLike={isLike} onClick={handleChangeIsLike}>
          {isLike ? '♥' : '♡'}
        </S.LikeButton>
      </S.LikeButtonContainer>
    </S.CommentContainer>
  );
}

const S = {
  CommentContainer: styled.li`
    width: 100%;
    padding: 20px;
    border-bottom: 3px;
    border-color: var(--color-gray02);
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  LeftDiv: styled.div`
    gap: 10px;
    display: flex;
  `,
  LikeButtonContainer: styled.div`
    padding-left: 1rem;
  `,
  LikeButton: styled.button<{ isLike: boolean }>`
    font-size: 1.2rem;
    color: ${(props) => (props.isLike ? 'var(--color-point-red)' : 'black')};
  `,
  ProfileImgButton: styled.button`
    width: 40px;
    height: 40px;
    border-radius: 9999px;
    overflow: hidden;
    flex-shrink: 0;
  `,
  ProfileImg: styled.img`
    width: 100%;
    height: 100%;
    background-color: black;
  `,
  Texts: styled.div`
    padding-left: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,

  UpperTexts: styled.p`
    line-height: 125%;
    gap: 10px;
  `,
  Nickname: styled.button`
    font-weight: bold;
    margin-right: 10px;
  `,
  LowerTexts: styled.p`
    display: flex;
    gap: 10px;
  `,
};
// '더 보기' 버튼 구현 요망

import React from 'react';
import styled from '@emotion/styled';

import Comment from './comments/Comment';
import CommonStyles from '../../../styles/CommonStyles';

type Props = {
  isMe?: boolean; // 댓글 작성자가 자기 자신이면 true
  children?: string;
};

export default function CommentsComponent() {
  const [isCommentsOpened, setIsCommentsOpened] = React.useState(false);

  const handleChangeOpenedOrClosed = () => {
    setIsCommentsOpened((prevBool) => !prevBool);
  };

  return (
    <section>
      <S.CommentsDropdownButton onClick={handleChangeOpenedOrClosed}>
        댓글 12개 모두 보기
      </S.CommentsDropdownButton>
      {isCommentsOpened ? (
        <S.CommentList>
          <Comment isMe={true}>다람쥐 헌 쳇바퀴에 타고파.</Comment>
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
        <S.SubmitBtn small={false}>게시</S.SubmitBtn>
      </S.CommentForm>
    </section>
  );
}

const S = {
  ...CommonStyles,
  CommentsDropdownButton: styled.button`
    width: 100%;
    height: 35px;
    background-color: var(--color-gray09);
    text-align: left;
    border-radius: 9999px;
    padding: 0px 20px;
    display: flex;
    align-items: center;
  `,
  CommentList: styled.ol`
    display: flex;
    flex-direction: column;
  `,
  CommentForm: styled.form`
    margin-top: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  `,
  SubmitBtn: styled(CommonStyles.SubmitBtn)`
    width: 75px;
    display: flex;
    flex-shrink: 0;
    justify-content: center;
  `,
};
// '더 보기' 버튼 구현 요망

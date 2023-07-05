import CommonStyles from '../../../styles/CommonStyles';
import styled from '@emotion/styled';

export default function ListItem() {
  return (
    <S.ItemWrap>
      <div>
        <S.ItemShareUser>공유하는 유저</S.ItemShareUser>
        <S.ItemUserList>
          <li>
            <img src='https://pbs.twimg.com/profile_images/1173873201039806464/R1lWiNES_400x400.jpg' />
          </li>
          <li>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlX16ekpWJwSiFBtYqm_BIzS2E8gs2Iqf_87SbY3zQx4u59Zv-mjMUGmT9K0xOsgDICn0&usqp=CAU' />
          </li>
          <li>
            <img src='https://blog.kakaocdn.net/dn/bY6iW4/btrEJwN3Zrf/SqQZ605snSkSqP5U96S3AK/img.png' />
          </li>
        </S.ItemUserList>
      </div>
      <div>
        <S.ItemTitle>가계부명</S.ItemTitle>
        <S.ItemName>햄구님의 가계부</S.ItemName>
      </div>
      <S.BookmarksBtn />
    </S.ItemWrap>
  );
}

const S = {
  ...CommonStyles,
  ItemWrap: styled.li`
    position: relative;
    box-shadow: var(--shadow-default);
    border-radius: var(--rounded-default);
    padding: 1.625rem 1.25rem;
    display: flex;
    flex-direction: column;
    min-height: 13rem;
    justify-content: space-between;
    flex-basis: 50%;
    background: var(--color-white);
  `,

  ItemTitle: styled.h3`
    font-size: 0.75rem;
    color: var(--color-primary);
    margin-bottom: 0.75rem;
  `,

  ItemName: styled.div`
    font-size: 1rem;
  `,

  ItemShareUser: styled.h4`
    font-size: 0.75rem;
    color: var(--color-primary);
    margin-bottom: 0.75rem;
  `,

  ItemUserList: styled.ul`
    display: flex;
    & > li {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      overflow: hidden;
      &:not(:first-of-type) {
        margin-left: 0.75rem;
      }
      & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  `,

  BookmarksBtn: styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
  `,
};

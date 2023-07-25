import Link from 'next/link';
import CommonStyles from '../../styles/CommonStyles';
import styled from '@emotion/styled';
import { RecordData } from '.';

type Props = {
  item: RecordData;
};

export default function ListItem({ item }: Props) {
  if (!item) {
    return null;
  }
  const { financialRecordId, financialRecordName, users } = item;

  return (
    <Link href={`/financialrecord/list/${financialRecordId}`}>
      <S.ItemWrap>
        <div>
          <S.ItemTitle>가계부명</S.ItemTitle>
          <S.ItemName>{financialRecordName}</S.ItemName>
        </div>
        <div>
          <S.ItemShareUser>공유하는 유저</S.ItemShareUser>
          <S.ItemUserList>
            {users?.map((el) => (
              <li key={el.userId}>
                <img src={el.profileImgPath} alt={`${el.nickname} 프로필 사진`} />
              </li>
            ))}
          </S.ItemUserList>
        </div>
      </S.ItemWrap>
    </Link>
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
    border: 2px solid transparent;

    &:hover {
      border-color: var(--color-primary);
    }
  `,

  ItemTitle: styled.div`
    font-size: 0.75rem;
    color: var(--color-primary);
    margin-bottom: 0.75rem;
    font-weight: 600;
  `,

  ItemName: styled.h2`
    font-size: 1rem;
    font-weight: 400;
  `,

  ItemShareUser: styled.h3`
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

import styled from '@emotion/styled';
import CommonStyles from '../../../../styles/CommonStyles';
import { useRouter } from 'next/router';
import { FaRecHeaderData } from '../../../../types/financialRecord';

interface FaRecHeaderProps {
  data: FaRecHeaderData;
  setActiveTab: (value: string) => void;
}

export default function FaRecHeader({ setActiveTab, data }: FaRecHeaderProps) {
  if (!data) {
    return null;
  }

  const { financialRecordName, memo, articleCount, faRecTimeline, imgId, isBookmark, users } = data;

  const router = useRouter();
  const faRecId = router.query.slug;
  const handleButtonClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <>
      <S.Container>
        <S.ImgBox>
          <img src={imgId} alt={`${financialRecordName} 프로필 사진`} />
        </S.ImgBox>
        <S.ContentBox>
          <div>
            <S.FaRecName>{financialRecordName}</S.FaRecName>
            <S.LinkWrap>
              <S.LinkBtn
                href='/financial-record/edit/[slug]'
                as={`/financial-record/edit/${faRecId}`}
                color='--color-point-lilac'
                size='small'
              >
                가계부 편집
              </S.LinkBtn>
              <S.LinkBtn href='/' size='small'>
                가계부 작성
              </S.LinkBtn>
            </S.LinkWrap>
          </div>
          <S.ButtonWrap>
            <S.aLink href='#article' onClick={() => handleButtonClick('가계부')}>
              게시물
              <span>{articleCount}</span>
            </S.aLink>
            <S.aLink href='#timeline' onClick={() => handleButtonClick('타임라인')}>
              타임라인
              <span>{faRecTimeline}</span>
            </S.aLink>
            <S.Button type='button'>
              멤버
              <span>{users.length}</span>
            </S.Button>
          </S.ButtonWrap>
          <S.DescContainer>{memo}</S.DescContainer>
        </S.ContentBox>
      </S.Container>
    </>
  );
}

const S = {
  ...CommonStyles,
  Container: styled.section`
    display: flex;
    width: 100%;
    align-items: center;
    padding: 3.125rem 0.625rem;
  `,

  ImgBox: styled.div`
    width: 9.375rem;
    height: 9.375rem;
    min-width: 150px;
    border-radius: var(--rounded-full);
    overflow: hidden;
    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition-duration: 0.7s;
    }
    &:hover > img {
      transform: scale(1.1);
    }
  `,
  ContentBox: styled.div`
    flex: 1;
    margin-left: 2.8rem;
    display: flex;
    flex-direction: column;

    & > div {
      display: flex;
      align-items: center;
      margin-bottom: 1.75rem;
    }

    & > div:nth-of-type(1) {
      justify-content: space-between;
    }
  `,
  LinkWrap: styled.div`
    flex-shrink: 0;
    margin-left: 1.4rem;

    & > a {
      font-size: var(--text-s);
      line-height: 1;
    }
    & > a + a {
      margin-left: 1.25rem;
    }
  `,
  FaRecName: styled.h1`
    font-size: var(--text-m);
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    background-image: linear-gradient(to right, #0d0d0d, var(--color-primary));
  `,
  ButtonWrap: styled.div`
    display: flex;
    gap: 2rem;
  `,
  Button: styled.button`
    &:hover {
      color: var(--color-gray02);
    }
    & > span {
      font-weight: 600;
      color: var(--color-primary);
      margin-left: 0.625rem;
    }
  `,
  aLink: styled.a`
    &:hover {
      color: var(--color-gray02);
    }
    & > span {
      font-weight: 600;
      color: var(--color-primary);
      margin-left: 0.625rem;
    }
  `,
  DescContainer: styled.div`
    width: 100%;
  `,
};

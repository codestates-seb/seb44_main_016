import styled from '@emotion/styled';
import CommonStyles from '../../../../styles/CommonStyles';
import { useRouter } from 'next/router';

import Loading from '../../../../components/Loading';
import ErrorComponent from '../../../../components/ErrorComponent';
import { FaRecHeaderData } from '../../../../types/article';

interface FaRecHeaderProps {
  data: FaRecHeaderData;
  setActiveTab: (value: string) => void;
  isLoading: boolean;
  isError: boolean;
  error: string;
}

export default function FaRecHeader({ setActiveTab, isLoading, isError, error, data }: FaRecHeaderProps) {
  const { financialRecordName, memo, articleCount, timeLineCount, users, imgPath } = data || {};

  const router = useRouter();
  const faRecId = router.query.slug;
  const handleButtonClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <>
      <S.Container>
        {isError ? (
          <ErrorComponent message={error} />
        ) : isLoading ? (
          <Loading />
        ) : (
          <>
            <S.ImgBox>
              <img src={imgPath} alt={`${financialRecordName} 프로필 사진`} />
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
                  <S.LinkBtn href={`/editor?faRecId=${faRecId}`} size='small'>
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
                  <span>{timeLineCount}</span>
                </S.aLink>
                <S.Button type='button'>
                  멤버
                  <span>{users && users.length}</span>
                </S.Button>
              </S.ButtonWrap>
              <S.DescContainer>{memo}</S.DescContainer>
            </S.ContentBox>
          </>
        )}
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

    @media screen and (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      padding: 3.125rem 0;
    }
  `,

  ImgBox: styled.div`
    width: 9.375rem;
    height: 9.375rem;
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

    @media screen and (max-width: 768px) {
      margin: 1.6rem 0 0 0;
    }

    & > div {
      display: flex;
      align-items: center;
      margin-bottom: 1.75rem;
      @media screen and (max-width: 768px) {
        margin-bottom: 1rem;
        justify-content: center;
      }
    }

    & > div:nth-of-type(1) {
      justify-content: space-between;
      @media screen and (max-width: 768px) {
        flex-direction: column;
        & > div {
          margin: 1rem 0 0 0;
        }
      }
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
    & > * {
      line-height: 1.2;
    }
    @media screen and (max-width: 768px) {
      & > * {
        display: flex;
        flex-direction: column;
        align-items: center;
        & > span {
          margin-left: 0;
          text-align: center;
        }
      }
    }
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

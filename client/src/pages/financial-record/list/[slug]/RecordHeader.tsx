import styled from '@emotion/styled';
import CommonStyles from '../../../../styles/CommonStyles';
import { useRouter } from 'next/router';
import Tab from '../../../../components/Tab';

export default function RecordHeader() {
  const router = useRouter();
  const faRecId = router.query.slug;

  return (
    <>
      <S.Container>
        <S.ImgBox>
          <img
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlX16ekpWJwSiFBtYqm_BIzS2E8gs2Iqf_87SbY3zQx4u59Zv-mjMUGmT9K0xOsgDICn0&usqp=CAU'
            alt=''
          />
        </S.ImgBox>
        <S.ContentBox>
          <div>
            <S.FaRecName>가계부 이름</S.FaRecName>
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
            <S.Button type='button'>
              게시물
              <span>59</span>
            </S.Button>
            <S.Button type='button'>
              타임라인
              <span>30</span>
            </S.Button>
            <S.Button type='button'>
              멤버
              <span>6</span>
            </S.Button>
          </S.ButtonWrap>
          <S.DescContainer>
            가게부 설명가게부 설명가게부 설명가게부 설명가게부 설명가게부 설명가게부 설명가게부 설명가게부
            설명가게부 설명가게부 설명가게부 설명가게부 설명가게부 설명가게부 설명가게부 설명가게부 설명
          </S.DescContainer>
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
  `,
  LinkWrap: styled.div`
    margin-left: 1.4rem;

    & > a {
      font-size: var(--text-s);
      line-height: 1;
      padding: 0.55rem 1.125rem;
    }
    & > a + a {
      margin-left: 1.25rem;
    }
  `,
  FaRecName: styled.h1`
    font-size: var(--font-m);
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
  DescContainer: styled.div`
    width: 100%;
  `,
};
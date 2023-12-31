import React from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import CommonStyles from '../../styles/CommonStyles';
import SelectOption from './SelectOption';
import StyledDatePicker from './StyledDatePicker';
import InputNaturalNumber from './InputNaturalNumber';
import RadioSet from './RadioSet';
import ImgsUploader from './ImgsUploader';
import useUserGlobalValue from '../../components/redux/getUserInfo';

import { CATEGORY } from '../../constants/category';
import { APISns } from '../../services/apiSns';
import { APIfinancialRecord } from '../../services/apiFinancial';

export default function EditorPage() {
  const { isLoggedIn } = useUserGlobalValue();
  const router = useRouter();

  const [isEdit, setIsEdit] = React.useState(false);
  const [faRecArticleId, setFaRecArticleId] = React.useState(NaN);
  const [feedArticleId, setFeedArticleId] = React.useState(NaN);

  const [articleType, setArticleType] = React.useState(0); // 가계부/절약팁/허락해줘 (라디오 버튼)
  /* ↓ 'articleType=가계부'일 경우에만 표시 ↓ */
  const [faRecId, setFaRecId] = React.useState(NaN); // 가계부의 고유번호
  const [faDate, setFaDate] = React.useState(new Date()); // 날짜+시간
  const [category, setCategory] = React.useState(''); // 카테고리명
  const [price, setPrice] = React.useState(0); // 금액
  const [faType, setFaType] = React.useState(0); // 지출/수입 (라디오 버튼)
  const [title, setTitle] = React.useState(''); // 제목(내역)
  /* ↓ 모든 articleType에 표시 ↓ */
  const [imgSrcs, setImgSrcs] = React.useState(['', '', '', '']); // 이미지 (0~4장)
  const [content, setContent] = React.useState(''); // 내용(본문)
  const [scope, setScope] = React.useState(0); // 가계부에만/타임라인에도

  React.useEffect(() => {
    if (!isLoggedIn) {
      router.push('/user/login');
      alert('로그인이 필요합니다.');
    }

    const params = new URLSearchParams(window.location.search);

    const paramFaRecId = Number(params.get('faRecId'));
    const paramFaRecArticleId = Number(params.get('faRecArticleId'));
    const paramFeedArticleId = Number(params.get('feedArticleId'));

    setFaRecId(paramFaRecId || 0);
    setFaRecArticleId(paramFaRecArticleId);
    setFeedArticleId(paramFeedArticleId);

    setIsEdit(!!(paramFaRecId || paramFaRecArticleId || paramFeedArticleId));
  }, []);

  const handleChangeArticleType = (id: number) => {
    setArticleType(id);
  };
  const handleChangeFaRecId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFaRecId = parseInt(e.target.value, 10);
    setFaRecId(selectedFaRecId);
  };
  const handleChangeDate = (date: Date) => {
    setFaDate(date);
  };
  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };
  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredPrice = parseInt(`0${e.target.value}`.replace(/\D/g, ''), 10); // 입력된 문자열에서 숫자 빼고 다 없애기
    e.target.value = enteredPrice.toString(); // 00123 → 123
    setPrice(enteredPrice);
  };
  const handleChangeFaType = (id: number) => {
    setFaType(id);
  };
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const enteredContents = e.target.value;
    const processedContents = enteredContents.replaceAll('<br>', '\r\n');
    setContent(processedContents);
  };
  const handleChangeScope = (id: number) => {
    setScope(id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      imgSrcs.forEach((imgSrc) => {
        formData.append('files', imgSrc);
      });

      if (articleType === 0) {
        // 가계부 (게시글/타임라인)
        APIfinancialRecord.editRecordArticle(
          formData,
          faRecId,
          faRecArticleId,
          category,
          faDate,
          title,
          price,
          content,
          scope
        );
      } else {
        // SNS (절약팁/허락해줘)
        APISns.editFeedArticle(feedArticleId, formData, articleType, content);
      }
    } catch (error) {
      console.error('Requset 에러 발생:', error);
    }
  };

  if (!isLoggedIn) {
    return <></>;
  }

  return (
    <S.EditorContainer onSubmit={handleSubmit}>
      {!isEdit ? (
        <S.Row>
          <RadioSet
            legend=''
            options={['가계부', '절약 팁', '허락해줘!']}
            checkValue={articleType}
            handler={handleChangeArticleType}
            isCenter={true}
          />
        </S.Row>
      ) : (
        <></>
      )}
      {/* ↓ 'articleType=가계부'일 경우에만 표시 ↓ */}
      {articleType === 0 && (
        <>
          {/* 작성할 가계부 (셀렉트) */}
          {Number.isNaN(faRecId) ? (
            <></>
          ) : (
            <S.Row>
              <SelectOption
                legend='가계부 이름'
                options={['가계부A', '가계부B', '가계부C']}
                handler={handleChangeFaRecId}
                initIndex={faRecId}
              />
            </S.Row>
          )}
          <S.Row>
            {/* 날짜+시간 */}
            <StyledDatePicker legend={'날짜'} selected={faDate} handler={handleChangeDate} />
            {/* 카테고리 */}
            <SelectOption
              legend='지출 카테고리'
              options={CATEGORY.flatMap((cate) => cate.name)}
              handler={handleChangeCategory}
              disabled={faType !== 0}
              initIndex={faType}
            />
          </S.Row>
          <S.Row>
            {/* 금액 */}
            <InputNaturalNumber legend='금액' num={price} handler={handleChangePrice} />
            {/* 지출/수입 (라디오 버튼) */}
            <RadioSet
              legend='분류'
              options={['지출', '수입']}
              checkValue={faType}
              handler={handleChangeFaType}
            />
          </S.Row>
          {/* 내역(제목) */}
          <S.InputContainer>
            <S.Legend>제목</S.Legend>
            <S.InputText
              type='text'
              placeholder='제목을 입력하세요 (예: 사용 내역, 사용처 등)'
              value={title}
              onChange={handleChangeTitle}
            />
          </S.InputContainer>
        </>
      )}
      {/* ↓ 모든 articleType에 표시 ↓ */}
      {/* 이미지 */}
      <S.Row>
        <ImgsUploader setImgSrcs={setImgSrcs} />
      </S.Row>
      {/* 내용(본문) */}
      <S.InputContainer>
        <S.Legend>내용</S.Legend>
        <S.Textarea placeholder='내용을 입력해주세요' value={content} onChange={handleChangeContent} />
      </S.InputContainer>
      {/* 공개 범위 (라디오 버튼) */}
      <S.Row>
        {articleType === 0 && (
          <RadioSet
            legend='공개 범위'
            options={['가계부에만', '타임라인에도']}
            checkValue={scope}
            handler={handleChangeScope}
          />
        )}
        {/* Submit 버튼 */}
        <S.SubmitBtnContainer>
          <S.SubmitBtn type='submit' onClick={handleSubmit}>
            편집 완료
          </S.SubmitBtn>
        </S.SubmitBtnContainer>
      </S.Row>
    </S.EditorContainer>
  );
}

const S = {
  ...CommonStyles,
  EditorContainer: styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 3rem;
    gap: 2rem;
  `,

  Row: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    gap: 2rem;
  `,

  SelectBtn: styled.select`
    background-color: white;
    border-radius: 100px;
    width: 100%;
    padding: 1rem;
    color: var(--color-gray01);
    border: 1px solid var(--color-border-gray);
    &:placeholder {
      color: var(--color-gray07);
    }
    &:focus {
      outline: 1px solid var(--color-primary);
    }
  `,

  SubmitBtnContainer: styled.div`
    display: flex;
    justify-content: end;
  `,

  InputContainer: styled.fieldset`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.25rem;
  `,
  Legend: styled.legend`
    padding-bottom: 0.5rem;
    font-weight: bold;
  `,
};

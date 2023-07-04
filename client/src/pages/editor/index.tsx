import React from 'react';

import tw from 'twin.macro';
import styled from '@emotion/styled';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import CommonStyles from '../../styles/CommonStyles';

const S = {
  ...CommonStyles,
  EditorContainer: styled.form(tw`flex flex-col p-16 gap-5`),
  Row: styled.section(tw`w-full flex justify-evenly`),
  RadioContainer: styled.section(tw`flex gap-5`),
  ImgSample: styled.img(tw`w-[153px] h-[153px]  bg-pink-500 rounded-[10px]`),
};

const articleTypeOptions: { value: number; label: string }[] = [
  { value: 1, label: '가계부' },
  { value: 2, label: '절약 팁' },
  { value: 3, label: '허락해줘!' },
];
const faTypeOptions: { value: number; label: string }[] = [
  { value: 1, label: '지출' },
  { value: 2, label: '수입' },
];
const scopeOptions: { value: number; label: string }[] = [
  { value: 1, label: '가계부에만' },
  { value: 2, label: '타임라인에도' },
];

export default function EditorPage() {
  // 일부 값들은 Enum으로 바꾸는 걸 권장

  const [articleType, setArticleType] = React.useState(1); // 가계부/절약팁/허락해줘 (라디오 버튼)
  /* ↓ 'articleType=가계부'일 경우에만 표시 ↓ */
  const [faRecId, setFaRecId] = React.useState(1); // 가계부의 고유번호
  const [faDate, setFaDate] = React.useState(new Date()); // 날짜 (시간 미포함)
  const [category, setCategory] = React.useState(''); // 카테고리명
  const [price, setPrice] = React.useState(0); // 금액
  const [faType, setFaType] = React.useState(1); // 지출/수입 (라디오 버튼)
  const [title, setTitle] = React.useState(''); // 제목(내역)
  /* ↓ 모든 articleType에 표시 ↓ */
  // const [images, setImages] = React.useState([]); // 이미지 (0~4장)
  const [content, setContent] = React.useState(''); // 내용(본문)
  const [scope, setScope] = React.useState(1); // 가계부에만/타임라인에도

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
    const enteredPrice = parseInt(e.target.value, 10);
    setPrice(enteredPrice);
  };
  const handleChangeFaType = (id: number) => {
    setFaType(id);
  };
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const handleChangeScope = (id: number) => {
    setScope(id);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (articleType === 1) {
        // 가계부
        const body = {
          financialRecordId: faRecId,
          category,
          financialRecordDate: faDate,
          price,
          content,
          scope,
          // imageId: , (미구현 & 필수 사항 아님)
          userId: 0,
          // "voteId": , (가계부에는 절약/Flex 기능을 사용하지 않음)
          // "financialRecordArticleHashTagId": , (미구현 & 필수 사항 아님)
        };
        await axios.post(
          `http://localhost:8080/financialrecord/${faRecId}/article/'`,
          body
        );
      } else {
        // 절약팁/허락해줘
        const body = {
          content,
          scope,
          userId: 0,
        };
        await axios.post('http://localhost:8080/feedArticles/article', body);
      }
      console.log(`Requset 성공: 게시글 작성`);
    } catch (error) {
      console.error('Requset 에러 발생:', error);
    }
  };

  return (
    <S.EditorContainer onSubmit={handleSubmit}>
      <S.Row>
        {/* 가계부/절약팁/허락해줘 (라디오 버튼) */}
        <S.RadioContainer>
          {articleTypeOptions.map((option) => (
            <S.RadioBtnLabel key={option.value}>
              <S.RadioBtn
                type='radio'
                value={option.value}
                checked={articleType === option.value}
                onChange={() => handleChangeArticleType(option.value)}
              />
              {option.label}
            </S.RadioBtnLabel>
          ))}
        </S.RadioContainer>
      </S.Row>
      {/* ↓ 'articleType=가계부'일 경우에만 표시 ↓ */}
      {/* 작성할 가계부 (셀렉트) */}
      <select name='faRecs' id='faRec' onChange={handleChangeFaRecId}>
        <option value='1'>가계부1</option>
        <option value='2'>가계부2</option>
        <option value='3'>가계부3</option>
      </select>
      <S.Row>
        {/* 날짜 (시간 미포함) */}
        <DatePicker selected={faDate} onChange={handleChangeDate} />
        {/* 카테고리 */}
        <select name='categories' id='category' onChange={handleChangeCategory}>
          <option value='식비'>식비</option>
          <option value='교통비'>교통비</option>
          <option value='교육비'>교육비</option>
          <option value='여가비'>여가비</option>
        </select>
      </S.Row>
      <S.Row>
        {/* 금액 */}
        <input
          type='number'
          name='price'
          placeholder='금액을 입력하세요'
          min='0'
          value={price}
          onChange={handleChangePrice}
        />
        {/* 지출/수입 (라디오 버튼) */}
        <S.RadioContainer>
          {faTypeOptions.map((option) => (
            <S.RadioBtnLabel key={option.value}>
              <S.RadioBtn
                type='radio'
                value={option.value}
                checked={faType === option.value}
                onChange={() => handleChangeFaType(option.value)}
              />
              {option.label}
            </S.RadioBtnLabel>
          ))}
        </S.RadioContainer>
      </S.Row>
      {/* 내역(제목) */}
      <S.InputText
        type='text'
        placeholder='제목을 입력하세요'
        value={title}
        onChange={handleChangeTitle}
      />
      {/* ↓ 모든 articleType에 표시 ↓ */}
      {/* 이미지 */}
      <S.Row>
        <S.ImgSample />
        <S.ImgSample />
        <S.ImgSample />
        <S.ImgSample />
      </S.Row>
      {/* 내용(본문) */}
      <S.Textarea
        placeholder='내용을 입력해주세요'
        value={content}
        onChange={handleChangeContent}
      />
      {/* 공개 범위 (라디오 버튼) */}
      <S.RadioContainer>
        {scopeOptions.map((option) => (
          <S.RadioBtnLabel key={option.value}>
            <S.RadioBtn
              type='radio'
              value={option.value}
              checked={faType === option.value}
              onChange={() => handleChangeScope(option.value)}
            />
            {option.label}
          </S.RadioBtnLabel>
        ))}
      </S.RadioContainer>
      {/* Submit 버튼 */}
      <S.SubmitBtn type='submit'>편집 완료</S.SubmitBtn>
    </S.EditorContainer>
  );
}

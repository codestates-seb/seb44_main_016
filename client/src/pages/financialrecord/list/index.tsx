import CommonStyles from '../../../styles/CommonStyles';
import styled from '@emotion/styled';
import { PAGE_NAMES } from '../../../constants/pageNames';
import ListItem from './ListItem';
import SearchIcon from '../../../../public/images/icon/search.svg';

export default function index() {
  return (
    <S.ListWrap>
      <S.BlindTitle>{PAGE_NAMES.FINANCIAL_RECORD_LIST}</S.BlindTitle>
      <S.FormWrap>
        <S.InputWrap>
          <S.InputText type='text' placeholder='검색어를 입력해주세요.' />
          <S.Button>
            <SearchIcon />
          </S.Button>
        </S.InputWrap>
        <S.SubmitBtn>새 가계부 만들기</S.SubmitBtn>
      </S.FormWrap>
      <S.ListContainer>
        <ListItem />
      </S.ListContainer>
    </S.ListWrap>
  );
}

const S = {
  ...CommonStyles,

  ListWrap: styled.div`
    display: flex;
    flex-direction: column;
    padding: 1.875rem;
    width: 100%;
  `,

  FormWrap: styled.form`
    display: flex;
    align-items: center;
    margin-bottom: 1.75rem;
  `,

  InputWrap: styled.div`
    position: relative;
    flex: 1;
    margin-right: 0.625rem;
  `,

  ListContainer: styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.25rem;
  `,

  Button: styled.button`
    position: absolute;
    top: 50%;
    right: 1.25rem;
    transform: translateY(-50%);
  `,
};

import CommonStyles from '../../styles/CommonStyles';
import styled from '@emotion/styled';
import { PAGE_NAMES } from '../../constants/pageNames';
import ListItem from './ListItem';
import SearchIcon from '../../../public/images/icon/search.svg';
import { useQuery } from '@tanstack/react-query';
import { Metadata } from 'next';
import { APIfinancialRecord } from '../../services/apiFinancial';
import useInput from '../../hooks/useComponents';

export const metadata: Metadata = {
  title: '가계부 목록',
  description: '가계부 목록 페이지입니다.',
};

export type UserData = {
  userId: string;
  profileImgPath: string;
};

export type RecordData = {
  financialRecordId: number | undefined;
  financialRecordName: string | undefined;
  /**  후순위 기능이라 옵셔널체이닝 사용 */
  isBookmark?: boolean | undefined;
  users: UserData[] | undefined;
};

export default function FinancialListPage() {
  const { isLoading, error, data, isSuccess } = useQuery<RecordData[]>(
    ['recordList'],
    APIfinancialRecord.getRecordList
  );

  const [searchInput] = useInput(
    'text',
    '검색어를 입력해주세요',
    'faRecSearch'
  );

  return (
    <S.ListWrap>
      <S.BlindTitle>{PAGE_NAMES.FINANCIAL_RECORD_LIST}</S.BlindTitle>
      <S.FormWrap>
        <S.InputWrap>
          {searchInput}
          <S.Button>
            <SearchIcon />
          </S.Button>
        </S.InputWrap>
        <S.SubmitBtn>새 가계부 만들기</S.SubmitBtn>
      </S.FormWrap>
      <S.FaRecList>
        {isLoading ? (
          <p>로딩 중입니다.</p>
        ) : error ? (
          <p>오류가 발생했습니다</p>
        ) : (
          isSuccess &&
          data.map((el) => <ListItem key={el.financialRecordId} item={el} />)
        )}
      </S.FaRecList>
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

  FaRecList: styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  `,

  Button: styled.button`
    position: absolute;
    top: 50%;
    right: 1.25rem;
    transform: translateY(-50%);
  `,
};

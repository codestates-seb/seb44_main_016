import CommonStyles from '../../styles/CommonStyles';
import styled from '@emotion/styled';
import ListItem from './ListItem';
import { useQuery } from '@tanstack/react-query';
import { APIfinancialRecord } from '../../services/apiFinancial';
import useInput from '../../hooks/useComponents';
import SVGs from '../../constants/svg';
import Loading from '../../components/Loading';
import { useState } from 'react';
import ErrorComponent from '../../components/ErrorComponent';
import { FAREC_MESSAGES } from '../../constants/messages/faRec';
import withAuth from '../../components/WithAuth';
import HeadMeta from '../../components/HeadMeta';
import { FAREC_META_DATA } from '../../constants/seo/faRecMetaData';

export type UserData = {
  userId: number;
  nickname: string;
  profileImgPath: string;
};

export type RecordData = {
  financialRecordId: number | undefined;
  financialRecordName: string | undefined;
  isBookmark?: boolean | undefined;
  users: UserData[] | undefined;
};

function FinancialListPage() {
  const { data, error, isError, isLoading } = useQuery<RecordData[]>(
    ['recordList'],
    APIfinancialRecord.getRecordList
  );

  const [searchInput, search] = useInput('text', '검색어를 입력해주세요', 'faRecSearch', 'on');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSearching(true);
  };

  let displayData = data;

  if (isSearching && search) {
    displayData = data?.filter((el) => el.financialRecordName?.includes(search));
  }
  return (
    <S.ListWrap>
      <HeadMeta
        title={FAREC_META_DATA.FINANCIAL_RECORD_LIST_PAGE.TITLE}
        description={FAREC_META_DATA.FINANCIAL_RECORD_LIST_PAGE.DESCRIPTION}
      />
      <S.FormWrap>
        <S.InputWrap>
          {searchInput}
          <S.Button onClick={handleSearch}>{SVGs.searchFarec}</S.Button>
        </S.InputWrap>
        <S.LinkBtn href='/financial-record/create'>새 가계부 만들기</S.LinkBtn>
      </S.FormWrap>

      {isError ? (
        <ErrorComponent message={(error as Error).message} />
      ) : isLoading ? (
        <Loading />
      ) : displayData && displayData.length > 0 ? (
        <S.FaRecList>
          {Array.isArray(displayData) &&
            displayData?.map((el) => <ListItem key={el.financialRecordId} item={el} />)}
        </S.FaRecList>
      ) : (
        <S.ErrorText>{FAREC_MESSAGES.FAREC_EMPTY}</S.ErrorText>
      )}
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
    height: 100%;
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

export default withAuth(FinancialListPage);

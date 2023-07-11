import { ReactNode } from 'react';
import RecordHeader from './RecordHeader';
import styled from '@emotion/styled';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <S.Container>
        <RecordHeader />
        {children}
      </S.Container>
    </>
  );
}

const S = {
  Container: styled.div`
    padding: 1.875rem;
  `,
};

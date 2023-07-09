import { ReactNode } from 'react';
import RecordHeader from './RecordHeader';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <RecordHeader />
      {children}
    </>
  );
}

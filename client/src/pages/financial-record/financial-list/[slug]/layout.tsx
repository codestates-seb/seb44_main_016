import RecordHeader from './RecordHeader';

export default function Layout({ children }) {
  return (
    <>
      <RecordHeader />
      {children}
    </>
  );
}

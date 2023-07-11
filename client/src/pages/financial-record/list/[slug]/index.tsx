import styled from '@emotion/styled';
import RecordHeader from './RecordHeader';
import { useState } from 'react';
import Tab from '../../../../components/Tab';

export default function FinancialPage() {
  const [activeTab, setActiveTab] = useState<string>('가계부');
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  const tabs = ['가계부', '타임라인']ㄹf

  return (
    <S.Container>
      <RecordHeader />
      <Tab tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
      {activeTab === '가계부' ? '오구' : '아기오구'}
    </S.Container>
  );
}
const S = {
  Container: styled.div`
    padding: 1.875rem;
  `,
};

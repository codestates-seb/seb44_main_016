import styled from '@emotion/styled';
import FaRecHeader from './FaRecHeader';
import { useState } from 'react';
import Tab from '../../../../components/Tab';
import FaRecArticle from './FaRecArticle';

export default function FinancialPage() {
  const [activeTab, setActiveTab] = useState<string>('가계부');
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  const tabs = ['가계부', '타임라인'];

  return (
    <S.Container>
      <FaRecHeader />
      <Tab tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
      {activeTab === '가계부' ? <FaRecArticle /> : '아기오구'}
    </S.Container>
  );
}
const S = {
  Container: styled.div`
    padding: 1.875rem;
  `,
};

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
  const dummy = [
    {
      financialRecordId: 1,
      category: '식비',
      faDate: 1657686000000,
      title: '초밥',
      price: -20000,
      content: '완전 끝내주는 초밥 오마카세를 먹으러 다녀왔다 너무너무마싰다~',
      scope: '가계부 타임라인',
      imgId: [
        'https://images.unsplash.com/photo-1563612116625-3012372fccce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=741&q=80',
        'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
      ],
      userId: 2,
    },
    {
      financialRecordId: 2,
      category: '식비',
      faDate: 1657772400000,
      title: '스테이크',
      price: -45000,
      content: '고기의 진수를 느낄 수 있는 스테이크 집에서 저녁을 즐겼다. 맛있어서 기분이 좋아졌다~',
      scope: '가계부 게시글',
      imgId: [
        'https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      ],
      userId: 2,
    },
    {
      financialRecordId: 3,
      category: '식비',
      faDate: 1657772400000,
      title: '스테이크',
      price: -45000,
      content: '고기의 진수를 느낄 수 있는 스테이크 집에서 저녁을 즐겼다. 맛있어서 기분이 좋아졌다~',
      scope: '가계부 게시글',
      imgId: [
        'https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      ],
      userId: 2,
    },
  ];
  let lastDate: string | null = null;

  return (
    <S.Container>
      <FaRecHeader />
      <Tab tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
      {/* map 함수로 변경 예정 */}
      {activeTab === '가계부'
        ? dummy.map((data, i) => {
            const date = new Date(data.faDate);
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const dateString = `${date.getFullYear()}. ${month}. ${date.getDate()}`;
            let dateHeader = null;

            if (lastDate !== dateString) {
              dateHeader = <S.DateHeader>{dateString}</S.DateHeader>;
              lastDate = dateString;
            }

            return (
              <div key={data.financialRecordId}>
                {dateHeader}
                <FaRecArticle data={data} />
              </div>
            );
          })
        : '타임라인페이지'}
    </S.Container>
  );
}
const S = {
  Container: styled.div`
    padding: 1.875rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  `,
  DateHeader: styled.h2`
    font-size: var(--text-default);
    margin: 0.625rem 0 1.25rem;
  `,
};

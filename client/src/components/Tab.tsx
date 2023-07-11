import styled from '@emotion/styled';

type TabProps = {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
};

export default function Tab({ tabs, activeTab, onTabChange }) {
  return (
    <S.TabWrapper>
      {tabs.map((tab, i) => (
        <button
          key={i}
          onClick={() => onTabChange(tab)}
          className={activeTab === tab ? 'active' : ''}
        >
          {tab}
        </button>
      ))}
    </S.TabWrapper>
  );
}

const S = {
  TabWrapper: styled.nav`
    width: 100%;
    border-top: 1px solid var(--color-point-light-gray);
    display: flex;
    justify-content: center;

    & > button {
      padding: 1rem 1.7rem;
      color: var(--color-gray03);
      border-top: 2px solid transparent;
      &.active {
        border-color: var(--color-primary);
        color: var(--color-primary);
      }
    }
  `,
};

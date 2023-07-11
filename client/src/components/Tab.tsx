import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Tab({ tabs }) {
  const router = useRouter();

  console.log(router);

  return (
    <S.TabWrapper>
      {tabs.map((tab, i) => (
        <Link
          key={i}
          href={tab.link}
          className={router.asPath === tab.link ? 'active' : ''}
        >
          {tab.name}
        </Link>
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

    & > a {
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

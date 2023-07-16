import styled from '@emotion/styled';
import { CATEGORY } from '../constants/category';

interface CategoryProps {
  category: string;
}

function findCategoryColor(name: string): string {
  const category = CATEGORY.find((category) => category.name === name);
  return category ? category.color : 'transparent';
}

export default function Category({ category }: CategoryProps) {
  return <S.Category category={category}>{category}</S.Category>;
}

const S = {
  Category: styled.span<CategoryProps>`
    padding: 0 0.3rem;
    position: relative;
    z-index: 1;

    &::before {
      content: '';
      display: block;
      background: ${(props) => findCategoryColor(props.category)};
      border-radius: var(--rounded-full);
      position: absolute;
      width: 100%;
      height: 0.6rem;
      z-index: -1;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  `,
};

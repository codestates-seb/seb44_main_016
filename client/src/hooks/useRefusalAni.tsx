import { useState } from 'react';
import { css, keyframes } from '@emotion/react';

export const isClickedStyled = ({ isClicked }: SubmitBoxProps) =>
  isClicked &&
  css`
    animation: ${bounce} 1s infinite;
  `;

export interface SubmitBoxProps {
  isClicked?: string | undefined;
}

export function useRefusalAni() {
  const [isClicked, setIsClicked] = useState(false);

  const isClickedProps = { isClicked: isClicked ? 'true' : undefined };

  const RefusalAnimation = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 1000);
  };

  return [isClickedProps, RefusalAnimation];
}

export const bounce = keyframes`
  0% {
    transform: translateX(0);
  }
  30% {
    transform: translateX(-10px);
  }
  50% {
    transform: translateX(10px);
  }
  70% {
    transform: translateX(-10px);
  }
  100% {
    transform: translateX(0);
  }
`;

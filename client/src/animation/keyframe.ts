import { keyframes } from '@emotion/react';

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

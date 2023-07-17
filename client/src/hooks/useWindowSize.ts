import { useEffect, useState } from 'react';

import { ScreenEnum } from '../constants/enums';

export const useWindowType = () => {
  const [width, height] = useWindowSize();

  if (width < 480) {
    return ScreenEnum.MOBILE;
  } else if (width < 900) {
    return ScreenEnum.TABLET;
  } else {
    // width >= 900
    return ScreenEnum.DESKTOP;
  }
};

export const useWindowSize = () => {
  const [windowWidth, setWindowWidth] = useState(Number.MAX_VALUE);
  const [windowHeight, setWindowHeight] = useState(Number.MAX_VALUE);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return [windowWidth, windowHeight];
};

import { useEffect, useState } from 'react';

export const useWindowSizeWithMount = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 480);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    handleResize();
    setIsMounted(true);

    return () => {
      window.removeEventListener('resize', handleResize);
      setIsMounted(false);
    };
  }, []);

  return { isSmallScreen, isMounted };
};

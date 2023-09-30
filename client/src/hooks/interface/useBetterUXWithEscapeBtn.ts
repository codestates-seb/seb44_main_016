import { RefObject, useEffect } from 'react';

export const useBetterUXWithEscapeBtn = (isOpen: boolean, closeButtonRef: RefObject<HTMLButtonElement>) => {
  useEffect(() => {
    const handleFocusCloseButton = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') {
        e.preventDefault();
        if (closeButtonRef.current) {
          closeButtonRef.current.focus();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleFocusCloseButton);
    }

    return () => {
      document.removeEventListener('keydown', handleFocusCloseButton);
    };
  }, [isOpen]);
};

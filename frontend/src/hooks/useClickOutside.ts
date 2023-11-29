import { useEffect, useRef } from 'react';

export const useClickOutside = (props: UseClickOutsideType) => {
  const { isElementActive = false, setIsElementActive } = props;
  const refElement = useRef<HTMLDivElement>(null);

  const mousedownEventHandler = (event: MouseEvent | KeyboardEvent) => {
    if (isElementActive) {
      if (
        !refElement.current ||
        !refElement.current.contains(event.target as HTMLElement)
      ) {
        setIsElementActive(false);
      }
    }
  };

  const keydownEventHandler = (event: KeyboardEvent) => {
    if (isElementActive) {
      if (!refElement.current || event.code === 'Escape') {
        setIsElementActive(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', mousedownEventHandler);
    window.addEventListener('keydown', keydownEventHandler);

    return () => {
      window.removeEventListener('mousedown', mousedownEventHandler);
      window.removeEventListener('keydown', keydownEventHandler);
    };
  }, [isElementActive]);

  return refElement;
};

export type UseClickOutsideType = {
  isElementActive: boolean;
  setIsElementActive: React.Dispatch<React.SetStateAction<boolean>>;
};

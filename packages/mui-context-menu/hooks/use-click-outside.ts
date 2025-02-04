import { useEffect } from 'react';

export const useClickOutside = (
  anchors: HTMLElement[],
  onClose: () => void,
) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | Event) {
      if (!anchors) {
        return;
      }

      const isClickInside = anchors.some(ref =>
        ref?.contains(event.target as Node),
      );

      if (!isClickInside) {
        onClose?.();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [anchors, onClose]);
};

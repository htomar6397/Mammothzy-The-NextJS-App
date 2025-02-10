import { useEffect } from 'react';

const useHandleClickOutside = (
  wrapperRef: React.RefObject<HTMLDivElement>,
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, wrapperRef, setIsOpen]);
};

export default useHandleClickOutside;
  


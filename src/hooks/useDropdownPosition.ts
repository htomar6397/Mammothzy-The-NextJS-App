import { Dispatch, SetStateAction, useEffect } from 'react';

const useDropdownPosition = (isOpen: boolean, wrapperRef: React.RefObject<HTMLDivElement>, dropdownRef: React.RefObject<HTMLDivElement>, setDropdownPosition: Dispatch<SetStateAction<"top" | "bottom">>) => {
  useEffect(() => {
    if (isOpen && wrapperRef.current && dropdownRef.current) {
      const buttonRect = wrapperRef.current.getBoundingClientRect();
      const dropdownHeight = dropdownRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;

      const shouldShowAbove =
        spaceBelow < dropdownHeight + 10 && spaceAbove > dropdownHeight + 10;

      setDropdownPosition(shouldShowAbove ? "top" : "bottom");
    }
  }, [isOpen, wrapperRef, dropdownRef, setDropdownPosition]);
};

export default useDropdownPosition;


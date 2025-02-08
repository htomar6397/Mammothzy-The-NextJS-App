import  { useState, useRef, useEffect } from "react";
import ChevronDown  from "/public/logos/downarrow.svg";
 

interface SelectProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder = "Select an option",
  error,
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [dropdownPosition, setDropdownPosition] = useState<"top" | "bottom">(
    "bottom"
  );
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((opt) => opt.value === value);

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
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && wrapperRef.current && dropdownRef.current) {
      const buttonRect = wrapperRef.current.getBoundingClientRect();
      const dropdownHeight = dropdownRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;

      // Calculate if dropdown should appear above or below
      // Add extra padding of 10px for visual comfort
      const shouldShowAbove =
        spaceBelow < dropdownHeight + 10 && spaceAbove > dropdownHeight + 10;

      setDropdownPosition(shouldShowAbove ? "top" : "bottom");
    }
  }, [isOpen]);

 

  return (
    <div className="flex flex-col gap-1  w-full  ">
      <div className="space-y-1 w-full flex flex-col gap-[0.35rem]">
        {label && (
          <label className="font-medium text-[12px] leading-[20px]">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div ref={wrapperRef} className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full flex items-center justify-between px-[0.96rem] h-10 text-[12px] leading-[20px] 
            border-[1px] border-[#E5E5E5] shadow-sm rounded-full bg-white 
            ${error ? " ring-red-500" : "ring-black"}
          
            focus:ring-1`}
          >
            <span
              className={`${
                !selectedOption ? "text-gray-500" : "text-gray-900"
              }`}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <ChevronDown
              width="20"
              height="20"
              className={`  text-gray-600 transform transition-transform duration-200
            ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isOpen && (
            <div
              ref={dropdownRef}
              className={`absolute z-10 w-full bg-white border-[1px] border-gray-200 rounded-2xl shadow-sm
              ${
                dropdownPosition === "top"
                  ? "bottom-full mb-1"
                  : "top-full mt-1"
              }`}
              style={{
                maxHeight: "240px",
                overflow: "auto",
              }}
            >
              <ul className="py-1">
                {options.map((option) => (
                  <li
                    key={option.value}
                    className={`px-[0.96rem] py-2 text-[12px] leading-[20px] cursor-pointer
                    ${
                      option.value === value
                        ? "bg-gray-50 text-gray-900"
                        : "text-gray-700"
                    }
                    hover:bg-gray-50`}
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default Select;

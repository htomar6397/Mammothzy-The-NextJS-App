import { useState, useRef } from "react";
import ChevronDown from "/public/logos/downarrow.svg";
import { SelectProps, States } from "@/lib/types";

import useDropdownPosition from "@/hooks/useDropdownPosition";
import useHandleClickOutside from "@/hooks/useHandleClickOutside";
import useFilteredSearch from "@/hooks/useFilteredSearch";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [dropdownPosition, setDropdownPosition] = useState<"top" | "bottom">(
    "bottom"
  );
  const wrapperRef = useRef<HTMLDivElement>(null!);
  const dropdownRef = useRef<HTMLDivElement>(null!);
  const selectedOption = options.find((opt) => opt.value === value);

  useHandleClickOutside(wrapperRef, isOpen, setIsOpen);
  useFilteredSearch<States>({ setFilteredOptions, options, searchTerm });
  useDropdownPosition(isOpen, wrapperRef, dropdownRef, setDropdownPosition);

  return (
    <div className="w-full flex-grow">
    <div className="flex flex-col gap-1 ">
      <div className="space-y-1 flex flex-col gap-[0.235rem]">
        {label && (
          <label className="font-medium text-[12px] leading-[20px]">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div ref={wrapperRef} className=" relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full  flex items-center justify-between px-[0.96rem] h-[2.62rem] text-[12px] leading-[20px] 
            border-[1px] border-[#E5E5E5]  rounded-full bg-white shadow-sm
            ${error ? " ring-red-500" : "ring-black"}
            focus:ring-1`}
          >
            <span
              className={`${
                !selectedOption && !searchTerm
                  ? "text-gray-500"
                  : "text-gray-900"
              }`}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <ChevronDown
              width="20"
              height="20"
              className={`text-gray-600 transform transition-transform duration-200
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
              } `}
              style={{
                maxHeight: "240px",
                overflow: "hidden",
              }}
            >
              <div className="px-[0.96rem] pt-2">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Type to search..."
                  className="w-full h-8 px-2 py-1 text-[12px] leading-[20px] border border-gray-200 rounded-full focus:outline-none"
                />
              </div>
              <ul className="py-1 custom-scrollbar ">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option, index) => (
                    <li
                      key={option.value}
                      className={`px-[0.96rem] py-2 text-[12px] leading-[20px] cursor-pointer
                    ${
                      option.value === value
                        ? "bg-gray-50 text-gray-900"
                        : "text-gray-700"
                    }
                    hover:bg-gray-50 ${
                      index !== filteredOptions.length - 1 &&
                      "border-b border-gray-100"
                    }`}
                      onClick={() => {
                        onChange(option.value);
                        setIsOpen(false);
                        setSearchTerm("");
                      }}
                    >
                      {option.label}
                    </li>
                  ))
                ) : (
                  <li className="px-[0.96rem] py-2 text-gray-500 text-[12px] leading-[20px]">
                    No options available
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
    </div>
  );
};

export default Select;

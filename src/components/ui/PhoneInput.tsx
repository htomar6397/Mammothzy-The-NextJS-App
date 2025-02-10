import { useState, useRef } from "react";
import ChevronDown from "/public/logos/downarrow.svg";
import Image from "next/image";
import { countries } from "@/lib/constants";
import { getSelectedCountryData } from "@/lib/utils";
import { Country, CountrySelectProps } from "@/lib/types";
import useHandleClickOutside from "@/hooks/useHandleClickOutside";
import useFilteredSearch from "@/hooks/useFilteredSearch";
import useDropdownPosition from "@/hooks/useDropdownPosition";

const PhoneInput: React.FC<CountrySelectProps> = ({
  value,
  onChange,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(countries);
  const [selectedCountry, setSelectedCountry] = useState({
    value: "in",
    label: "India",
    flag: "in",
    dialCode: "+91",
    length: 10,
  });
  const wrapperRef = useRef<HTMLDivElement>(null!);
  const dropdownRef = useRef<HTMLDivElement>(null!);
  const [dropdownPosition, setDropdownPosition] = useState<"top" | "bottom">(
    "bottom"
  );

  const handleCountrySelect = (country: Country) => {
    setIsOpen(false);
    const selectedCountryData = getSelectedCountryData(
      country?.dialCode || "+91"
    );
    if (selectedCountryData) {
      setSelectedCountry(selectedCountryData);
    }
    if (value.phoneNumber)
      onChange({
        dialCode: country?.dialCode,
        phoneNumber: (value?.phoneNumber).slice(0, selectedCountryData?.length),
      });

    setSearchTerm("");
  };

  const handlePhoneChange = (phoneNumber: string) => {
    onChange({ dialCode: value?.dialCode || "+91", phoneNumber });
  };


  // handle dropdownPosition top or bottom
  useDropdownPosition(isOpen, wrapperRef, dropdownRef, setDropdownPosition);
  //  handle mouse click outside modal
  useHandleClickOutside(wrapperRef, isOpen, setIsOpen);
  // for searching
  useFilteredSearch<Country>({
    setFilteredOptions,
    options: countries,
    searchTerm,
  });


  return (
    <div className="w-full ">
      <div className="space-y-1 w-full flex flex-col gap-[0.35rem] border-[1px] border-[#E5E5E5] shadow-sm rounded-full">
        <div
          ref={wrapperRef}
          className={` relative flex items-center rounded-full group focus-within:ring-1 ${
            error ? " ring-red-500" : "  ring-black"
          }`}
        >
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 pl-3 pr-2 rounded-l-full h-[2.525rem]  bg-white focus:outline-none"
          >
            <div className="rounded-full w-5 h-5 overflow-hidden flex items-center justify-center bg-gray-200">
              <Image
                src={`https://flagcdn.com/w40/${selectedCountry.flag}.png`}
                width={20}
                height={20}
                alt={selectedCountry.flag}
                className="object-cover w-full h-full"
              />
            </div>
            <ChevronDown
              className={`text-gray-600 transform transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Divider */}
          <div className="h-6 w-[1px] group-focus-within:bg-[#898888]  bg-[#E5E5E5] absolute left-[3.7rem]" />
          {!value.phoneNumber && (
            <span className="absolute text-xs top-1/2 right-[40%] text-red-500 transform -translate-y-1/2 pointer-events-none">
              *
            </span>
          )}
          <input
            type="tel"
            value={value?.phoneNumber || ""}
            onChange={(e) => {
              const pt = RegExp(`^\\d{0,${selectedCountry.length}}$`);

              if (pt.test(e.target.value)) handlePhoneChange(e.target.value);
            }}
            placeholder="Contact Number"
            className={`w-full  px-[0.56rem] h-[2.525rem] rounded-r-full text-[12px] leading-[20px] focus:outline-none placeholder:text-gray-500`}
          />

          {isOpen && (
            <div
              ref={dropdownRef}
              className={`absolute z-10 w-full bg-white border-[1px] border-gray-200 rounded-2xl shadow-sm 
                ${
                  dropdownPosition === "top"
                    ? "bottom-full mb-1"
                    : "top-full mt-1"
                }
                `}
              style={{
                // maxHeight: "240px",
                overflowY: "hidden",
              }}
            >
              <div className="px-2 pt-2">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Type to search..."
                  className="w-full h-8 px-2 py-1 text-[12px] leading-[20px] border border-gray-200 rounded-full focus:outline-none"
                />
              </div>

              <ul className="py-1 custom-scrollbar">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option, index) => (
                    <li
                      key={option.value}
                      className={`flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-50
                     
                    ${
                      option.dialCode === (value?.dialCode || "+91")
                        ? "bg-gray-50 text-gray-900"
                        : "text-gray-700"
                    }
                   ${
                     index !== filteredOptions.length - 1 &&
                     "border-b border-gray-100"
                   }`}
                      onClick={() => handleCountrySelect(option)}
                    >
                      <Image
                        src={`https://flagcdn.com/w40/${option.flag}.png`}
                        width={20}
                        height={15}
                        alt={option.label}
                        className="rounded-sm object-cover"
                      />
                      <span className="text-[12px] leading-[20px] text-gray-700">
                        {option.label}
                      </span>
                      <span className="text-[12px] leading-[20px] text-gray-400 ml-auto">
                        {option.dialCode}
                      </span>
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
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default PhoneInput;

import { useState, useRef, useEffect } from "react";
import ChevronDown from "/public/logos/downarrow.svg";
import Image from "next/image";
import { countries } from "@/utils/location.validator";

interface Country {
  value: string;
  label: string;
  flag: string;
  dialCode: string;
}

interface PhoneValue {
  dialCode: string;
  phoneNumber: string;
}

interface CountrySelectProps {
  value: PhoneValue;
  onChange: (value: PhoneValue) => void;
  error?: string;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
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

  const handleCountrySelect = (country: Country) => {
    onChange({ dialCode: country?.dialCode, phoneNumber: value?.phoneNumber });
    setIsOpen(false);
  };

  const handlePhoneChange = (phoneNumber: string) => {
    onChange({ dialCode: value?.dialCode || '+91', phoneNumber });
  };

  return (
    <div className="flex flex-col gap-1 w-full ">
    <div className="space-y-1 w-full flex flex-col gap-[0.35rem] border-[1px] shadow-sm rounded-full">
      <div
        ref={wrapperRef}
        className={` relative flex items-center rounded-full focus-within:ring-1 ${
          error ? " ring-red-500" : "  ring-black"
        }`}
      >
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 pl-3 pr-2 rounded-l-full h-[2.4rem] bg-white focus:outline-none"
        >
          <div className="rounded-full w-5 h-5 overflow-hidden flex items-center justify-center bg-gray-200">
            <Image
              src={`https://flagcdn.com/w40/${
                countries.find((c) => c.dialCode === value?.dialCode)?.flag || 'in'
              }.png`}
              width={20}
              height={20}
              alt="Selected Country"
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
        <div className="h-6 w-[1.5px] bg-gray-200 absolute left-[3.7rem]" />
        {!value && <span className="absolute text-xs top-1/2 right-[38%] text-red-500 transform -translate-y-1/2 pointer-events-none">
          *
        </span>}
        <input
          type="tel"
          value={value?.phoneNumber}
          onChange={(e) => handlePhoneChange(e.target.value)}
          placeholder="Contact Number"
          className={`  px-[0.56rem] h-[2.4rem] rounded-r-full text-[12px] leading-[20px] focus:outline-none placeholder:text-gray-500`}
        />

        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute z-10 w-72 bg-white border-[1px] border-gray-200 rounded-2xl shadow-sm top-full mt-1"
          >
            <ul className="py-1 max-h-64 overflow-auto">
              {countries.map((country) => (
                <li
                  key={country.value}
                  className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleCountrySelect(country)}
                >
                  <Image
                    src={`https://flagcdn.com/w40/${country.flag}.png`}
                    width={20}
                    height={15}
                    alt={country.label}
                    className="rounded-sm object-cover"
                  />
                  <span className="text-[12px] leading-[20px] text-gray-700">
                    {country.label}
                  </span>
                  <span className="text-[12px] leading-[20px] text-gray-400 ml-auto">
                    {country.dialCode}
                  </span>
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

export default CountrySelect;

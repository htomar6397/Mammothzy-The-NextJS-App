import React from "react";
import  Check  from "/public/logos/check.svg";

type RadioOption = {
  label: string;
  value: string;
};

type RadioGroupProps = {
  options: RadioOption[];
  name: string;
  onChange: (value: string) => void;
  selectedValue: string;
  error?: string;
  groupLabel: string;
  required?: boolean;
};

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  name,
  onChange,
  selectedValue,
  error,
  groupLabel,
  required
 
}) => {
  return (
    <div className="">
      <p className="h-[20px] not-italic font-medium text-[14px] leading-[20px] flex items-center">
        {groupLabel}
        {required && <span className="text-red-500 ml-2">*</span>}
      </p>
      <div className="flex flex-col gap-3 mt-[0.90rem]">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center cursor-pointer"
          >
            <div
              className={`h-[1.17rem] w-[1.17rem] rounded-full flex items-center justify-center border-[2.45px] ${
                selectedValue === option.value
                  ? "bg-black border-black"
                  : "border-gray-200"
              }`}
            >
              {selectedValue === option.value && (
                <Check height={10} width={12} />
              )}
            </div>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => onChange(option.value)}
              className="hidden"
            />
            <span className="ml-[0.45rem] text-sm text-gray-800">
              {option.label}
            </span>
          </label>
        ))}

        <div
          className={`mt-[-0.3rem] overflow-hidden transition-height duration-300 ease-in-out ${
            selectedValue === "other"
              ? "max-h-20 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <input
            type="text"
            placeholder="Specify the category"
            onChange={(e) => onChange(e.target.value)}
            className="w-full border-[1px] rounded-full border-gray-200 px-[0.96rem] text-[12px] leading-[20px] h-10 shadow-sm focus:border-blue-500 focus:ring-blue-500 placeholder:text-gray-500"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default RadioGroup;

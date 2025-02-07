"use client";
import React, { useEffect, useState } from "react";
import Check from "/public/logos/check.svg";

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
  other?: boolean;
};

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  name,
  onChange,
  selectedValue,
  error,
  groupLabel,
  required,
  other,
}) => {
  const [lab, setLab] = useState<string>("");
  const [otherInputValue, setOtherInputValue] = useState<string>("");

  useEffect(() => {
    const selectedOption = options.find(
      (option) => option.value === selectedValue
    );
    setLab(selectedOption?.label || (selectedValue && "Other"));
  }, [selectedValue, options]);

  const dynamicOptions = other
    ? [...options, { label: "Other", value: "other" }]
    : options;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOtherInputValue(value);
    onChange(value); // Send custom value to parent
  };

  const handleRadioChange = (option: RadioOption) => {
    if (option.value !== "other") {
      setOtherInputValue("");
      onChange(option.value);
    }
    setLab(option.label);
  };

  return (
    <div className="flex flex-col gap-1 ">
     
        <p className="h-[20px] not-italic font-medium text-[14px] leading-[20px] flex items-center">
          {groupLabel}
          {required && <span className="text-red-500 ml-2">*</span>}
        </p>

        <div className="flex flex-col gap-3 mt-[0.90rem]">
          {dynamicOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center cursor-pointer"
            >
              <div
                className={`h-[1.17rem] w-[1.17rem] rounded-full flex items-center justify-center border-[2.45px] ${
                  lab === option.label
                    ? "bg-black border-black"
                    : "border-gray-200"
                }`}
              >
                {lab === option.label && <Check height={10} width={12} />}
              </div>
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={selectedValue === option.value}
                onChange={() => handleRadioChange(option)}
                className="hidden"
              />
              <span className="ml-[0.45rem] text-sm text-gray-800">
                {option.label}
              </span>
            </label>
          ))}

          {/* Show text input when "Other" is selected */}
          {lab === "Other" && (
            <input
              type="text"
              placeholder="Specify the category"
              value={otherInputValue}
              onChange={handleInputChange}
              className="w-full border-[1px] rounded-full border-gray-200 px-[0.96rem] text-[12px] leading-[20px] h-10 shadow-sm focus:border-blue-500 focus:ring-blue-500 placeholder:text-gray-500"
            />
          )}
        </div>
      
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default RadioGroup;

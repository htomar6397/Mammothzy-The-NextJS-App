"use client";
import React, { useEffect, useState } from "react";
import Check from "/public/logos/check.svg";
import { RadioGroupProps, RadioOption } from "@/lib/types";


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

  // set label or input value for other option
  useEffect(() => {
    const setLabelandValue = ()=>{
         const selectedOption = options.find(
           (option) => option.value === selectedValue
         );
         // console.log(selectedOption , selectedValue);
         setLab(selectedOption?.label || (selectedValue && "Other"));
         if (selectedOption === undefined && selectedValue === "")
           setLab("Other");
         setOtherInputValue(selectedOption ? "" : selectedValue);
    }
    setLabelandValue(); // Run once on initial render and whenever selectedValue changes
  }, [selectedValue, options]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
if (/^[A-Za-z\s]{0,30}$/.test(value)){ setOtherInputValue(value);
                 onChange(value); // Send custom value to parent
}
  };

  const handleRadioChange = (option: RadioOption) => {
    if (option.value !== "other") {
      setOtherInputValue("");
      onChange(option.value);
    }
    else onChange("");
    setLab(option.label);
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col gap-[0.875rem]">
        <p className="h-[20px] not-italic text-gray-800 font-medium text-[14px] leading-[18px] flex items-center">
          {groupLabel}
          {required && <span className="text-red-500 ml-2">*</span>}
        </p>

        <div className="flex flex-col gap-3">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center cursor-pointer"
            >
              <div
                className={`h-[1.08rem] w-[1.08rem] rounded-full flex items-center justify-center border-[2px] ${
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
              <span className="ml-[0.55rem] text-sm text-gray-800">
                {option.label}
              </span>
            </label>
          ))}

          {/* Show text input when "Other" is selected */}
          {other && (
            <div>
              <label className="flex items-center cursor-pointer">
                <div
                  className={`h-[1.08rem] w-[1.08rem] rounded-full flex items-center justify-center border-[2px] ${
                    lab === "Other"
                      ? "bg-black border-black"
                      : "border-gray-200"
                  }`}
                >
                  {lab === "Other" && <Check height={10} width={12} />}
                </div>
                <input
                  type="radio"
                  name={name}
                  value="other"
                  checked={selectedValue === "other"}
                  onChange={() =>
                    handleRadioChange({ value: "other", label: "Other" })
                  }
                  className="hidden"
                />
                <span className="ml-[0.55rem] text-sm text-gray-800">
                  Other
                </span>
              </label>

              <div
                className={` overflow-hidden transition-height duration-300 ease-in-out ${
                  lab === "Other"
                    ? "max-h-20 opacity-100 mt-2"
                    : "max-h-0 opacity-0"
                }`}
              >
                <input
                  type="text"
                  placeholder="Specify the category"
                  value={otherInputValue}
                  onChange={handleInputChange}
                  maxLength={20}
                  className="w-full border-[1px] rounded-full border-gray-200 px-[0.96rem] text-[12px] leading-[20px] h-10 shadow-sm focus:border-blue-500 focus:ring-blue-500 placeholder:text-gray-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default RadioGroup;

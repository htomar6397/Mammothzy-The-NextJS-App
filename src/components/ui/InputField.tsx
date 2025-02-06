import React from "react";

type InputFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
}) => (
  <div className="space-y-1 flex flex-col gap-[0.35rem] ">
    <label className=" font-medium text-[12px] leading-[20px]    ">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className=" w-full border-[1px] rounded-full  border-gray-200 px-[0.96rem] h-10 text-[12px] leading-[20px] shadow-sm focus:border-blue-500 focus:ring-blue-500 placeholder:text-gray-500"
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default InputField;

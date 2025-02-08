import React from "react";

type InputFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  type?: string; // default is "text" for input fields, can be "email" or "number" for different input types.  // Add more types as needed.  // For example, to add a password field, add type="password" to the InputField component.  // For example, to add a date picker, add type="date" to the InputField component.  // For example, to add a file upload field, add type="file" to the
  pattern?: string; // Add more patterns as needed.  // For example, to add a password field, add pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" to the InputField component.  // For example, to add a date picker
  maxLength?: number; // Add more maxLength as needed.  // For example, to add a password field, add maxLength={20} to the InputField component.  // For example, to add a date picker, add maxLength={10} to the InputField component.  // For example, to add a file upload field, add maxLength={100} to the InputField component.  // For example, to add a phone number field, add maxLength={15
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  type = "text",
  pattern = undefined, // Add more patterns as needed.  // For example, to add a password field, add pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" to the InputField component.  // For example, to add a date picker
  maxLength = undefined, // Add more maxLength as needed.  // For example, to add a password field, add maxLength={20} to the InputField component.  // For example, to add a date picker, add maxLength={10} to the InputField component.  // For example, to add a file upload field, add maxLength={100} to the InputField component.  // For example, to add a phone number field, add maxLength={15
  
}) => {
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     let inputValue = e.target.value;

     // Handle max length for number type manually
     if (type === "number" && maxLength && inputValue.length > maxLength) {
       inputValue = inputValue.slice(0, maxLength);
     }

     onChange(inputValue);
   };
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className=" w-full flex flex-col gap-2 ">
        <label className="not-italic text-gray-900 font-medium text-[12px] leading-[20px]    ">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
          type={type}
          pattern={pattern}
          maxLength={maxLength}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          className="  border-[1px] rounded-full box-content border-[#E5E5E5] px-[0.96rem] h-[2.525rem] text-[12px] leading-[20px] shadow-sm  placeholder:text-gray-500"
        />
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
export default InputField;

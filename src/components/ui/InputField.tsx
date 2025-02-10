import { InputFieldProps } from "@/lib/types";

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  pattern = undefined, // Add more patterns as needed.  // For example, to add a password field, add pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" to the InputField component.  // For example, to add a date picker
}) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (pattern) {
      if (new RegExp(pattern).test(inputValue)) onChange(inputValue);
    } else onChange(inputValue);
  };

  return (
    <div className="w-full flex-grow">
      <div className="flex flex-col gap-1 ">
        <div className="  flex flex-col gap-2 ">
          <label className="not-italic text-gray-900 font-medium text-[12px] leading-[20px]    ">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input
            placeholder={placeholder}
            value={value}
            onChange={handleInputChange}
            className=" w-full  border-[1px] rounded-full  border-[#E5E5E5] px-[0.96rem] h-[2.625rem] text-[12px] leading-[20px] shadow-sm  placeholder:text-gray-500"
          />
        </div>
        {error && <p className="text-red-500 text-xs  ">{error}</p>}
      </div>
    </div>
  );
};
export default InputField;

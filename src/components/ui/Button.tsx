import { ButtonProps } from "@/lib/types";

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "button",
  variant = "primary",
  icon,
}) => (
  <button
    type={type}
    onClick={onClick}
    className={`px-5 py-[0.7125rem]  text-sm rounded-full transition-all duration-300  delay-75 ${
      variant === "primary"
        ? "bg-black text-white border-0 hover:bg-gray-900 group font-[550] py-[0.75rem]"
        : "bg-gray-100 text-gray-700 border-2 border-gray-200 font-medium hover:bg-gray-200"
    }
    ${icon && "overflow-hidden relative hover:pr-12"}
    `}
  >
    <span className="inline-block">{label}</span>
    {icon && (
      <span className="absolute top-1/2 -translate-y-1/2 left-20 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-75">
        {icon}
      </span>
    )}
  </button>
);

export default Button;

import { z } from "zod";
import { activitySchema, locationSchema } from "@/lib/validations";
import { Dispatch, SetStateAction } from "react";

// Define form values type based on schema
export type ActivityFormValues = z.infer<typeof activitySchema>;
export type LocationFormValues = z.infer<typeof locationSchema>;


// Custom hook props for handling form submission step success
export interface FormProps {
  setStep: Dispatch<SetStateAction<number | null>>;
}
// radiogroup 
export type RadioOption = {
  label: string;
  value: string;
};

export type RadioGroupProps = {
  options: RadioOption[];
  name: string;
  onChange: (value: string) => void;
  selectedValue: string;
  error?: string;
  groupLabel: string;
  required?: boolean;
  other?: boolean;
};
// .....

// PhoneSelect 
export interface Country {
  value: string;
  label: string;
  flag: string;
  dialCode: string;
  length: number;
}

interface PhoneValue {
  dialCode: string;
  phoneNumber: string;
}

export interface CountrySelectProps {
  value: PhoneValue;
  onChange: (value: PhoneValue | undefined) => void;
  error?: string;
}
// .....

// InputField
export type InputFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  pattern?: string; // Add more patterns as needed.  // For example, to add a password field, add pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" to the InputField component.  // For example, to add a date picker
  };
  // ....

  // SelectField
  export interface States {
    label: string;
    value: string;
  }

  export interface SelectProps {
    options: States[];
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    error?: string;
    required?: boolean;
  }
  // ....

  // ButtonField
  export interface ButtonProps {
    label: string;
    onClick?: () => void;
    type?: "button" | "submit";
    variant?: "primary" | "secondary";
    icon?: React.ReactNode | undefined;
  }
  // ...
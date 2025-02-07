import { z } from "zod";

export const indianStates = [
  { value: "Andhra Pradesh", label: "Andhra Pradesh" },
  { value: "Assam", label: "Assam" },
  { value: "Bihar", label: "Bihar" },
  { value: "Delhi", label: "Delhi" },
  { value: "Karnataka", label: "Karnataka" },
  { value: "Maharashtra", label: "Maharashtra" },
  // Add more states as needed
];

export const countries = [
    { value: "in",
    label: "India",
    flag: "in",
    dialCode: "+91",
  },
  { value: "us", label: "United States", flag: "us", dialCode: "+1" },
  { value: "gb", label: "United Kingdom", flag: "gb", dialCode: "+44" },
  { value: "ca", label: "Canada", flag: "ca", dialCode: "+1" },
  { value: "de", label: "Germany", flag: "de", dialCode: "+49" },
  { value: "fr", label: "France", flag: "fr", dialCode: "+33" },

];

export const locationSchema = z.object({
  ad1: z.string({ required_error: "Address is Required" }).min(1),
  ad2: z.string({ required_error: "Category is required" }).optional(),
  zip: z.string({ required_error: "Zipcode is required" }).min(5).max(6),
  city: z.string({ required_error: "City is required" }).min(1),
  state: z.enum(
    [...indianStates.map((state) => state.value)] as [string, ...string[]],
    {
      required_error: "State is required",
      invalid_type_error: "Invalid state",
    }
  ),
  number: z.object({
  dialCode: z
    .string({ required_error: "Country Code is required" })
    .min(1, { message: "Country Code cannot be empty" }),
  phoneNumber: z
    .string({ required_error: "Contact Number is required" })
    .regex(/^\d+$/, { message: "Contact Number must contain only digits" })
    .min(10, { message: "Contact Number must be at least 10 digits long" }),
}),
  name: z.string({ required_error: " Contact Name is required" }).optional(),
});



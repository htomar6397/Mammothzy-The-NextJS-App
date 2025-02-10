import { z } from "zod";
import { getSelectedCountryData } from "./utils";

export const activitySchema = z
  .object({
    name: z
      .string({ required_error: "Name is required" })
      .min(1, { message: "Name is required" }),
    category: z
      .string({ required_error: "Category is required" })
      .min(1, { message: "Category is required" }),
    description: z
      .string({ required_error: "Activity description is required" })
      .min(5, { message: "Description must contain at least 5 characters" }),
    activityType: z.enum(["indoor", "outdoor", "virtual"], {
      required_error: "Activity type is required",
    }),
    locationType: z.enum(["provider", "user"], {
      required_error: "Location type is required",
    }),

    minMembers: z.string().optional(),
    maxMembers: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.minMembers && data.maxMembers) {
        return parseInt(data.maxMembers) >= parseInt(data.minMembers);
      }
      return true;
    },
    {
      message: "Max members must be >= min members",
      path: ["minMembers"],
    }
  );

export const locationSchema = z
  .object({
    ad1: z
      .string({ required_error: "Address is Required" })
      .min(1, { message: "Address is required" }),
    ad2: z.string().optional(),
    zip: z
      .string({ required_error: "Zipcode is required" })
      .min(5, { message: "Zipcode must be of 5 to 6 length" }),
    city: z
      .string({ required_error: "City is required" })
      .min(1, { message: "City is required" }),
    state: z.string({
      required_error: "State is required",
    }),
    number: z.object(
      {
        dialCode: z.string(),
        phoneNumber: z
          .string()
          .min(1, { message: "Contact Number is required" }),
      },
      { required_error: "Contact Number is required" }
    ),
    name: z.string().optional(),
  })
  .refine((data) => {
    const SelectedCountry = getSelectedCountryData(data.number.dialCode);
    if (SelectedCountry?.length !== data.number.phoneNumber.length) {
      throw new z.ZodError([
        {
          code: "custom",
          path: ["number", "phoneNumber"],
          message: `Phone number must be exactly ${SelectedCountry?.length} digits for the ${SelectedCountry?.label}.`,
        },
      ]);
    }
    return true;
  });





  // Trim all string values in the data recursively

 export function sanitizeData<T>(data: Record<string, unknown>): T {
  const sanitizedData = Object.fromEntries(
    Object.entries(data).map(([key, value]) =>
      typeof value === "string" ? [key, value.trim()] : [key, value]
    )
  );
  return sanitizedData as T;
}

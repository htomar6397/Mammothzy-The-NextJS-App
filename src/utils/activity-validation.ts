import { z } from "zod";

export const activitySchema = z
  .object({
    name: z.string({ required_error: "Name is required" }).min(1),
    category: z.string({ required_error: "Category is required" }).min(1),
    description: z.string({ required_error: "Activity description is required" }).min(5),
    activityType: z.enum(["indoor", "outdoor", "virtual"], {
      required_error: "Activity type is required",
    }),
    locationType: z.enum(["provider", "user"], {
      required_error: "Location type is required",
    }),
    minMembers: z
      .number()
      .int()
      .min(1, { message: "Minimum members must be at least 1" })
      .optional(),
    maxMembers: z
      .number()
      .int()
      .min(1, { message: "Maximum members must be at least 1" })
      .optional(),
  })
  .refine(
    (data) => {
      if (data.minMembers !== undefined && data.maxMembers !== undefined) {
        return data.maxMembers >= data.minMembers;
      }
      return true;
    },
    {
      message:
        "Maximum members must be greater than or equal to minimum members",
      path: ["minMembers"],
    }
  );


export const categories = [
  { value: "adventure", label: "Adventure & Games" },
  { value: "creative", label: "Creative Expression" },
  { value: "food", label: "Food & Drink" },
  { value: "learning", label: "Learning & Development" },
  { value: "sports", label: "Sports and Fitness" },
  { value: "volunteering", label: "Volunteering" },
  // { value: "other", label: "Other" },
];

export const activityTypes = [
  { value: "indoor", label: "Indoor" },
  { value: "outdoor", label: "Outdoor" },
  { value: "virtual", label: "Virtual" },
];

export const locationTypes = [
  { value: "provider", label: "Provider Location" },
  { value: "user", label: "User Location" },
];

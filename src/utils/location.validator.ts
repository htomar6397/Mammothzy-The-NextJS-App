import { z } from "zod";

export const locationSchema = z
  .object({
    ad1: z.string({ required_error: "Required" }).min(1),
    ad2: z.string({ required_error: "Category is required" }).optional(),
    zip: z.string({ required_error: "Zipcode is required" }).min(5).max(6),
    city: z.string({ required_error: "City is required" }).min(1)
    
  })
 
  




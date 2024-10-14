import { z } from 'zod';

export const usernameSchema=z.object({
    username:z.string().min(3).max(20).regex(/^[a-zA-Z0-9]+$/,"Userbame can only contain,letters,numbers,and underscores"),
})
export const eventSchema=z.object({
    title:z.string().min(1,"Title is Required").max(100,"Title must be 100 Characters or less"),
    description:z.string().min(1,"Description must be Required").max(500,"Description must be less 500 characters or less"),
    duration:z.number().int().positive("Duaration must be positive number"),
    isPrivate:z.boolean(),
    
});
export const daySchema = z
  .object({
    isAvailable: z.boolean(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.isAvailable) {
        return data.startTime < data.endTime;
      }
      return true;
    },
    {
      message: "End time must be more than start time",
      path: ["endTime"],
    }
  );

export const availabilitySchema = z.object({
  monday: daySchema,
  tuesday: daySchema,
  wednesday: daySchema,
  thursday: daySchema,
  friday: daySchema,
  saturday: daySchema,
  sunday: daySchema,
  timeGap: z.number().min(0, "Time gap must be 0 or more minutes").int(),
});
export const bookingSchema=z.object({
  name:z.string().min(1,"Name is Required"),
  email:z.string().email("Invalid email"),
date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format"),
  additionalInfo: z.string().optional(),
})
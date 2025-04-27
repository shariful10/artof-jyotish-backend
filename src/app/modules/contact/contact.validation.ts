import { z } from "zod";

const createContactValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    }),
    description: z.string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    }),
    photo: z
      .string({ invalid_type_error: "Photo must be a string" })
      .optional(),
  }),
});

export const ContactValidations = {
  createContactValidationSchema,
};

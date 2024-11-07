import { z } from "zod";

export const signUpFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Must be an valid email"),
  password: z.string().min(1, "Password is required"),
  name: z.string().min(1, "Name is required"),
  alias: z.string().min(1, "Alias is required"),
});

export type signUpFormSchemaType = z.infer<typeof signUpFormSchema>;

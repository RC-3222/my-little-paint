import { z } from "zod" // Add new import

export const FormSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email("Invalid email address"),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
})

//extract the inferred type from schema
export type FormSchemaType = z.infer<typeof FormSchema>

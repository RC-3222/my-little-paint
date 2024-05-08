import { z } from "zod" // Add new import

export const SearchFormSchema = z.object({
    reqStr: z
        .string()
        .min(3, {
            message: "request string must be at least 3 characters long",
        })
        .email("must be a valid email address"),
})

export type SearchFormSchemaType = z.infer<typeof SearchFormSchema>

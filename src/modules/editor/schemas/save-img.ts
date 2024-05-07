import { z } from "zod"

export const SaveImgSchema = z.object({
    imgName: z
        .string()
        .min(3, { message: "Image name must be at least 3 characters long" }),
})

export type SaveImgSchemaType = z.infer<typeof SaveImgSchema>

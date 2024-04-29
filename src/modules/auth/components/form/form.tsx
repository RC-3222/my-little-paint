import type { DefaultValues, FieldValues, SubmitHandler } from "react-hook-form"
import { FormProvider, useForm } from "react-hook-form"
import { type ReactNode, type PropsWithChildren } from "react"
import type { ZodType } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

type FormProps<T extends FieldValues> = PropsWithChildren & {
    schema: ZodType<T>
    onSubmit: SubmitHandler<T>
    additionalContent?: ReactNode | ReactNode[]
    defaultValues?: DefaultValues<T>
    className?: string
}

export const Form = <T extends FieldValues>({
    children,
    schema,
    onSubmit,
    defaultValues,
    className,
}: FormProps<T>) => {
    const { ...methods } = useForm<T>({
        resolver: zodResolver(schema),
        defaultValues,
    })

    return (
        <FormProvider {...methods}>
            <form
                className={className}
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                {children}
            </form>
        </FormProvider>
    )
}

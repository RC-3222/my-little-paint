import type { DefaultValues, FieldValues, SubmitHandler } from "react-hook-form"
import { FormProvider, useForm } from "react-hook-form"
import type { ComponentPropsWithoutRef } from "react"
import type { ZodType } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

type FormProps<T extends FieldValues> = Omit<
    ComponentPropsWithoutRef<"form">,
    "onSubmit"
> & {
    schema: ZodType<T>
    onSubmit: SubmitHandler<T>
    defaultValues?: DefaultValues<T>
}

export const Form = <T extends FieldValues>({
    children,
    schema,
    onSubmit,
    defaultValues,
    className,
    ...props
}: FormProps<T>) => {
    const { ...methods } = useForm<T>({
        resolver: zodResolver(schema),
        defaultValues,
    })

    return (
        <FormProvider {...methods}>
            <form
                {...props}
                className={className}
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                {children}
            </form>
        </FormProvider>
    )
}

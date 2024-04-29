import styles from "./form.module.scss"
import { FormProvider, useForm } from "react-hook-form"
import { Button, Card } from "@appShared/components"
import { type ReactNode, type PropsWithChildren } from "react"
import type { TypeOf } from "zod"
import { type ZodSchema } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

type FormProps<T extends ZodSchema<any>> = PropsWithChildren & {
    schema: T
    onSubmit: (props: TypeOf<T>) => void
    additionalContent?: ReactNode | ReactNode[]
    defaultValues?: TypeOf<T>
    title: string
}

export const Form = <T extends ZodSchema<any>>({
    children,
    schema,
    onSubmit,
    additionalContent,
    defaultValues,
    title,
}: FormProps<T>) => {
    const { ...methods } = useForm<TypeOf<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues,
    })

    return (
        <FormProvider {...methods}>
            <Card className={styles.container}>
                <form
                    className={styles.form}
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <h2>{title}</h2>
                    {children}
                    <Button className={styles.submitButton} type="submit">
                        Sign Up
                    </Button>
                </form>
                {additionalContent}
            </Card>
        </FormProvider>
    )
}

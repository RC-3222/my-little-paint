import classNames from "classnames"
import { useFormContext } from "react-hook-form"

type SearchInputProps = {
    className: string
    errorClassName: string
    name: string
}

export const SearchInput = ({
    className,
    name,
    errorClassName,
}: SearchInputProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext()

    return (
        <input
            className={classNames(className, {
                [errorClassName]: errors[name],
            })}
            placeholder="search by author"
            type="text"
            {...register(name)}
        />
    )
}

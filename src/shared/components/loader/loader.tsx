import styles from "./loader.module.scss"
import classNames from "classnames"

type LoaderProps = {
    className?: string
}

export const Loader = ({ className }: LoaderProps) => {
    const loaderStyles = classNames(styles.loader, className)

    return <div className={loaderStyles}></div>
}

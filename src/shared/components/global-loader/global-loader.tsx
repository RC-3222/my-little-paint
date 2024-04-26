import { Backdrop } from "../backdrop"
import { Loader } from "../loader"
import styles from "./global-loader.module.scss"

export const GlobalLoader = () => {
    return (
        <Backdrop>
            <Loader className={styles.loader} />
        </Backdrop>
    )
}

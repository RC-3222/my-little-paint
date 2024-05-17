export function isValidError(err: any): err is Error {
    return err instanceof Error && !!err.message
}

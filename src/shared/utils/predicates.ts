export function isValidError(err: any): err is Error {
    return !!err?.message
}

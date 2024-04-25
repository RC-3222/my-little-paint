export function isPasswordValid(password: string) {
    return !!password
}

export function isEmailValid(email: string) {
    return !!email && email.includes("@")
}

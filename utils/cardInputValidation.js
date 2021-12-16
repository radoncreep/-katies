export const validateInput = (value, minLength, setError) => {
    if (value.length < minLength) {
        setError("Invalid Input")
    } else {
        setError("")
    }
}
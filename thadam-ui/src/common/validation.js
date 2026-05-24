export function isAlphabet(input) {
    const regex = /^[A-Za-z ]+$/;
    return regex.test(input);
}

export function isNumberic(input) {
    const regex = /^[0-9]+$/;
    return regex.test(input);
}
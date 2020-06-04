export const randomNumber = (min: number = 1, max: number = 1000) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default {
    randomNumber,
}
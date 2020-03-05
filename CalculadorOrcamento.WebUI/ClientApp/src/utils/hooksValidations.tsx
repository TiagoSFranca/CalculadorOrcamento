export const requiredMessage = () => {
    return 'Campo Obrigatório';
}

export const maxLengthMessage = (max: number) => {
    return {
        value: max,
        message: `Tamanho máximo de ${max} chars`
    }
}

export const minLengthMessage = (min: number) => {
    return {
        value: min,
        message: `Tamanho mínimo de ${min} chars`
    }
}

export const greaterThanMessage = (value: number) => {
    return `O valor deve ser maior que ${value}`;
}

export const minValueMessage = (min: number) => {
    return {
        value: min,
        message: `O valor mínimo deve ser ${min}`
    }
}

export default {
    maxLengthMessage,
    minLengthMessage,
    requiredMessage,
    greaterThanMessage,
    minValueMessage
}
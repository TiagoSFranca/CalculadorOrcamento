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

export default {
    maxLengthMessage,
    minLengthMessage,
    requiredMessage
}
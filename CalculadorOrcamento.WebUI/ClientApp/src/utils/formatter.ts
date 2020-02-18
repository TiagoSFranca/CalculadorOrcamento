import moment from 'moment';


export const formatarData = (data: string) => {
    return moment(data).format('DD/MM/YYYY HH:mm');
}

export const formatarDataRequest = (data: Date | null) => {
    if (data)
        return moment(data).format('DD/MM/YYYY');
    return "";
}

export const formatarNumero = (numero: number | undefined | null) => {
    if (numero)
        return numero.toLocaleString('pt-BR');
    return "";
}

export default {
    formatarData,
    formatarDataRequest,
    formatarNumero
}
import moment from 'moment';


export const formatarData = (data: string) => {
    return moment(data).format('DD/MM/YYYY HH:mm');
}

export const formatarDataRequest = (data: Date | null) => {
    if (data)
        return moment(data).format('DD/MM/YYYY');
    return "";
}

export default {
    formatarData,
    formatarDataRequest
}
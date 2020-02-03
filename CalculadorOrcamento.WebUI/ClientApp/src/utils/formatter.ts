import moment from 'moment';


export const formatarData = (data: string) => {
    return moment(data).format('DD/MM/YYYY HH:mm');
}

export default {
    formatarData
}
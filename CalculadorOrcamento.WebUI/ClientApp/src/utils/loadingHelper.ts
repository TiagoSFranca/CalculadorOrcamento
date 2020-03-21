import { LoadingItem } from 'store/app/models'

const updateLoading = (list: string[], item: LoadingItem) => {
    if (item.name) {
        let contains = list.includes(item.name);
        if (contains && !item.loading) {
            list = list.filter(e => e !== item.name);
        } else if (!contains && item.loading) {
            list.push(item.name);
        }
    }

    return list;
}

const checkIsLoading = (list: string[], name: string) => {
    return list.includes(name);
}

export default {
    updateLoading,
    checkIsLoading
}
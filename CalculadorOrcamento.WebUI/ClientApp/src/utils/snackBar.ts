export enum ISnackBarType {
    sucesso,
    erro,
    info
}

export interface ISnackBar {
    message: string,
    title?: string,
    type: ISnackBarType
}

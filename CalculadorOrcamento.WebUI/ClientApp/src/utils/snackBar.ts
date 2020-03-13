import { HideSnackBarAction, ShowSnackBarAction } from "../store/app/reduceTypes";
import messages from "./messages";

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

const tratarErro = (erro: any) => {
    if (erro.response) {
        let response = erro.response;
        if (response.data) {
            let data = response.data;
            if (data.message) {
                if (!data.failures)
                    return data.message;
                else {
                    let failures = data.failures;

                    let errors: any[] = [];

                    Object.keys(failures).map(key => {
                        errors = errors.concat(failures[key])
                    });

                    if (errors.length > 0) {
                        return errors.join("\n");
                    }
                }
            }
        }
    }
    return "";
}

const montarSnackBar = (data?: ISnackBar | null, error?: any) => {
    if (data)
        return data as ISnackBar;
    else {

        let mensagem: string = '';
        if (error) {
            mensagem = tratarErro(error);
        }

        if (mensagem.length <= 0)
            mensagem = messages.ERRO_NAO_TRATADO;
        return {
            message: mensagem,
            title: messages.TITULO_ERRO,
            type: ISnackBarType.erro
        }
    }
}

export const dispatchSnackBar = (data?: ISnackBar | null, error?: any) => {
    const snack: ShowSnackBarAction = {
        type: "SHOW_SNACK_BAR_ACTION",
        snack: montarSnackBar(data, error)
    };
    return snack;
}

export const hideSnackBar = () => {
    const hide: HideSnackBarAction = {
        type: "HIDE_SNACK_BAR_ACTION"
    }

    return hide;
}

export const sucessoPadrao = () => {
    return dispatchSnackBar({ message: messages.OPERACAO_SUCESSO, type: ISnackBarType.sucesso, title: messages.TITULO_SUCESSO });
}
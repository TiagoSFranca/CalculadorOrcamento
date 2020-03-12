import { ChangePageTitleAction, HideSnackBarAction, ToggleDrawerAction } from "store/app/reduceTypes";
import { AppThunkAction } from 'store/index';
import KnownAction from "store/reduceTypesIndex";
import messages from "utils/messages";
import { ISnackBar, ISnackBarType } from "utils/snackBar";
import TratarErro from "utils/TratamentoErro";

const toggleDrawerAction = () => ({ type: 'TOGGLE_DRAWER' } as ToggleDrawerAction);

const changePageTitleAction = (value: string) => ({ type: 'CHANGE_PAGE_TITLE', value: value } as ChangePageTitleAction);

const showSnackBarAction = (data: ISnackBar | null, error?: any | null): AppThunkAction<KnownAction> => (dispatch) => {
    if (data != null) {
        dispatch({ type: 'SHOW_SNACK_BAR_ACTION', snack: data });
    } else {
        let mensagem: string = '';
        if (error) {
            mensagem = TratarErro(error);
        }

        if (mensagem.length <= 0)
            mensagem = messages.ERRO_NAO_TRATADO;

        dispatch({ type: 'SHOW_SNACK_BAR_ACTION', snack: { message: mensagem, type: ISnackBarType.erro, title: messages.TITULO_ERRO } });
    }

};

const hideSnackBarAction = () => ({ type: 'HIDE_SNACK_BAR_ACTION' } as HideSnackBarAction);

export default {
    toggleDrawerAction,
    changePageTitleAction,
    showSnackBarAction,
    hideSnackBarAction
}
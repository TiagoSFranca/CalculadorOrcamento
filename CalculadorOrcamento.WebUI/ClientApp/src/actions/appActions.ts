import { ChangePageTitleAction, HideSnackBarAction, ToggleDrawerAction } from "store/app/reduceTypes";
import { AppThunkAction } from 'store/index';
import KnownAction from "store/reduceTypesIndex";
import { ISnackBar, dispatchSnackBar } from "utils/snackBar";

const toggleDrawerAction = (): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: 'TOGGLE_DRAWER' } as ToggleDrawerAction)
};

const changePageTitleAction = (value: string): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: 'CHANGE_PAGE_TITLE', value: value } as ChangePageTitleAction);
}

const showSnackBarAction = (data: ISnackBar | null, error?: any | null): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch(dispatchSnackBar(data, error));
};

const hideSnackBarAction = (): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: 'HIDE_SNACK_BAR_ACTION' } as HideSnackBarAction);
}

export default {
    toggleDrawerAction,
    changePageTitleAction,
    showSnackBarAction,
    hideSnackBarAction
}
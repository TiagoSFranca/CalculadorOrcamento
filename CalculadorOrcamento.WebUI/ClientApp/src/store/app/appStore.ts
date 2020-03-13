import { AnyAction, Reducer } from 'redux';
import { ISnackBar } from 'utils/snackBar';
import KnownAction from '../reduceTypesIndex';
import loadingHelper from 'utils/loadingHelper'

export interface AppState {
    toggleDrawer: boolean;
    pageTitle: string;
    snackBar?: ISnackBar | null;
    isLoading: boolean;
    loading: string[];
}

const unloadedState: AppState = { toggleDrawer: false, pageTitle: "Inicio", isLoading: false, loading: [] };

export const reducer: Reducer<AppState> = (state: AppState | undefined, incomingAction: AnyAction): AppState => {
    if (state === undefined) {
        return unloadedState
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'TOGGLE_DRAWER':
            return { ...state, toggleDrawer: !state.toggleDrawer };
        case 'CHANGE_PAGE_TITLE':
            return { ...state, pageTitle: action.value };
        case 'SHOW_SNACK_BAR_ACTION':
            return { ...state, snackBar: action.snack }
        case 'HIDE_SNACK_BAR_ACTION':
            return { ...state, snackBar: null };
        case 'IS_LOADING_APP':
            return { ...state, isLoading: action.value }
        case 'SET_LOADING_COMPONENT':
            return { ...state, loading: loadingHelper.updateLoading(state.loading, action.item) }
        default:
            return state;
    }
};

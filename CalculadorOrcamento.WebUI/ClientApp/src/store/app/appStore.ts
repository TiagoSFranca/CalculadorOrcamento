import { AnyAction, Reducer } from 'redux';
import { ISnackBar } from 'utils/snackBar';
import KnownAction from '../reduceTypesIndex';

export interface AppState {
    toggleDrawer: boolean;
    pageTitle: string;
    snackBar?: ISnackBar | null;
}

const unloadedState: AppState = { toggleDrawer: false, pageTitle: "Inicio" };
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<AppState> = (state: AppState | undefined, incomingAction: AnyAction): AppState => {
    if (state === undefined) {
        return unloadedState
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'TOGGLE_DRAWER':
            return { toggleDrawer: !state.toggleDrawer, pageTitle: state.pageTitle };
        case 'CHANGE_PAGE_TITLE':
            return { toggleDrawer: state.toggleDrawer, pageTitle: action.value };
        case 'SHOW_SNACK_BAR_ACTION':
            return { ...state, snackBar: action.snack }
        case 'HIDE_SNACK_BAR_ACTION':
            return { ...state, snackBar: null };
        default:
            return state;
    }
};

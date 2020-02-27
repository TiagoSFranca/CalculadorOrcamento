import { AnyAction, Reducer } from 'redux';
import { ISnackBar, ISnackBarType } from 'utils/snackBar'
import { AppThunkAction } from 'store';
import TratarErro from 'utils/TratamentoErro';
import messages from 'utils/messages'

export interface AppState {
    toggleDrawer: boolean;
    pageTitle: string;
    snackBar?: ISnackBar | null;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

export interface ToggleDrawerAction { type: 'TOGGLE_DRAWER' };
export interface ChangePageTitleAction { type: 'CHANGE_PAGE_TITLE', value: '' };
export interface ShowSnackBarAction { type: 'SHOW_SNACK_BAR_ACTION', snack?: ISnackBar };
export interface HideSnackBarAction { type: 'HIDE_SNACK_BAR_ACTION' };

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
export type KnownAction = ToggleDrawerAction | ChangePageTitleAction | ShowSnackBarAction | HideSnackBarAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    toggleDrawerAction: () => ({ type: 'TOGGLE_DRAWER' } as ToggleDrawerAction),
    changePageTitleAction: (value: string) => ({ type: 'CHANGE_PAGE_TITLE', value: value } as ChangePageTitleAction),
    showSnackBarAction: (data: ISnackBar | null, error?: any | null): AppThunkAction<KnownAction> => (dispatch, getState) => {
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

    },
    hideSnackBarAction: () => ({ type: 'HIDE_SNACK_BAR_ACTION' } as HideSnackBarAction),
};

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

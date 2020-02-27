import localStorageService from "http/localStorageService";
import { AnyAction, Reducer } from 'redux';
import { AppThunkAction } from 'store';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface AuthState {
    isAuth: boolean
}

export interface SetIsAuthAction { type: 'SET_IS_AUTH', value: boolean };
export interface CheckIsAuthAction { type: 'CHECK_IS_AUTH' };

export type KnownAction = SetIsAuthAction | CheckIsAuthAction;

export const actionCreators = {
    setIsAuthAction: (value: boolean) => ({ type: 'SET_IS_AUTH', value: value } as SetIsAuthAction),

    checkIsAuthAction: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        var token = localStorageService.getAccessToken()
        if (token) {
            dispatch({ type: 'SET_IS_AUTH', value: true });
        } else {
            localStorageService.clearToken();
            dispatch({ type: 'SET_IS_AUTH', value: true });
        }
    }
};

const unloadedState: AuthState = { isAuth: true };
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

export const reducer: Reducer<AuthState> = (state: AuthState | undefined, incomingAction: AnyAction): AuthState => {
    if (state === undefined) {
        return unloadedState
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'SET_IS_AUTH':
            return { isAuth: action.value };
        default:
            return state;
    }
};

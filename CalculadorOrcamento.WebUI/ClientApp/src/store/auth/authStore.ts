import { AnyAction, Reducer } from 'redux';
import KnownAction from "../reduceTypesIndex";

export interface AuthState {
    isAuth: boolean;
    isLoading: boolean;
}

const unloadedState: AuthState = { isAuth: true, isLoading: false };

export const reducer: Reducer<AuthState> = (state: AuthState | undefined, incomingAction: AnyAction): AuthState => {
    if (state === undefined) {
        return unloadedState
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'SET_IS_AUTH':
            return { ...state, isAuth: action.value };
        case 'IS_LOADING':
            return { ...state, isLoading: action.value };
        default:
            return state;
    }
};

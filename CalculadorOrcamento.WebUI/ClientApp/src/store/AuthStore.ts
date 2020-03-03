import localStorageService from "http/localStorageService";
import { AnyAction, Reducer } from 'redux';
import { AppThunkAction } from 'store';
import HTTP from 'http/index';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface AuthState {
    isAuth: boolean;
    isLoading: boolean;
}

export interface Usuario {
    id: number;
    codigo: string;
    nome: string;
    sobrenome: string;
    email: string;
    login: string;
}

export interface UsuarioAutenticado extends Usuario {
    token: string;
    refreshToken: string;
}

export interface CadastrarUsuario {
    nome: string;
    sobrenome: string;
    email: string;
    login: string;
    senha: string;
    confirmarSenha: string;
}

export interface AutenticarUsuario {
    login: string;
    senha: string;
}

interface SetIsAuthAction { type: 'SET_IS_AUTH', value: boolean };
interface CheckIsAuthAction { type: 'CHECK_IS_AUTH' };

interface IsLoadingAction {
    type: 'IS_LOADING';
    value: boolean;
}

export type KnownAction = SetIsAuthAction | CheckIsAuthAction | IsLoadingAction;

export const actionCreators = {
    setIsAuthAction: (value: boolean) => ({ type: 'SET_IS_AUTH', value: value } as SetIsAuthAction),

    checkIsAuthAction: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        var token = localStorageService.getAccessToken()
        if (token) {
            dispatch({ type: 'SET_IS_AUTH', value: true });
        } else {
            localStorageService.clearToken();
            dispatch({ type: 'SET_IS_AUTH', value: false });
        }
    },

    cadastrarUsuario: (data: CadastrarUsuario, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'IS_LOADING', value: true });

        HTTP.post(`/auth/register`, JSON.stringify(data))
            .then(response => response.data as Promise<Usuario>)
            .then(data => {
                dispatch({ type: 'IS_LOADING', value: false });
                callback();
            }, error => {
                callback(error);
                dispatch({ type: 'IS_LOADING', value: false });
            });
    },

    autenticarUsuario: (data: AutenticarUsuario, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'IS_LOADING', value: true });

        HTTP.post(`/auth/login`, JSON.stringify(data))
            .then(response => response.data as Promise<UsuarioAutenticado>)
            .then(data => {
                localStorageService.setToken({ access_token: data.token, refresh_token: data.refreshToken })
                dispatch({ type: 'IS_LOADING', value: false });
                dispatch({ type: 'SET_IS_AUTH', value: true });
                callback();
            }, error => {
                callback(error);
                dispatch({ type: 'IS_LOADING', value: false });
            });
    },
};

const unloadedState: AuthState = { isAuth: true, isLoading: false };
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

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

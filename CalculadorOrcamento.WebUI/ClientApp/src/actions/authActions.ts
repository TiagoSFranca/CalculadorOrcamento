import HTTP from 'http/index';
import localStorageService from "http/localStorageService";
import { AppThunkAction } from 'store/index';
import KnownAction from 'store/reduceTypesIndex';
import { SetIsAuthAction } from 'store/auth/reduceTypes';
import { CadastrarUsuario, AutenticarUsuario, UsuarioAutenticado, Usuario } from 'store/auth/models';

const BASE_URL = "auth";

const setIsAuthAction = (value: boolean) => ({ type: 'SET_IS_AUTH', value: value } as SetIsAuthAction);

const checkIsAuthAction = (): AppThunkAction<KnownAction> => (dispatch) => {
    var token = localStorageService.getAccessToken()
    if (token) {
        dispatch({ type: 'SET_IS_AUTH', value: true });
    } else {
        localStorageService.clearToken();
        dispatch({ type: 'SET_IS_AUTH', value: false });
    }
};

const cadastrarUsuario = (data: CadastrarUsuario, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: 'IS_LOADING', value: true });

    HTTP.post(`/${BASE_URL}/register`, JSON.stringify(data))
        .then(response => response.data as Promise<Usuario>)
        .then(data => {
            dispatch({ type: 'IS_LOADING', value: false });
            callback();
        }, error => {
            callback(error);
            dispatch({ type: 'IS_LOADING', value: false });
        });
};

const autenticarUsuario = (data: AutenticarUsuario, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
    dispatch({ type: 'IS_LOADING', value: true });

    HTTP.post(`/${BASE_URL}/login`, JSON.stringify(data))
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
};

const logout = (): AppThunkAction<KnownAction> => (dispatch) => {
    localStorageService.clearToken();
    dispatch({ type: 'SET_IS_AUTH', value: false });
};

export default {
    setIsAuthAction,
    checkIsAuthAction,
    cadastrarUsuario,
    autenticarUsuario,
    logout
}
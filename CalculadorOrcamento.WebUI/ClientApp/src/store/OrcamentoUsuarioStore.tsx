import HTTP from 'http/index';
import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { Usuario } from './AuthStore';
import { OrcamentoPermissao } from './OrcamentoPermissaoStore';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface OrcamentoUsuarioState {
    isLoading: boolean;
    orcamentoUsuarios?: OrcamentoUsuario[];
    orcamentoUsuario?: OrcamentoUsuario;
    search: boolean;
    usuarios: 
}

export interface OrcamentoUsuario {
    id: number;
    idOrcamento: number;
    idUsuario: number;
    usuario: Usuario;
    orcamentoUsuarioPermissoes: OrcamentoUsuarioPermissao[];
}

export interface OrcamentoUsuarioPermissao {
    id: number;
    idOrcamentoUsuario: number;
    idPermissao: number;
    permite: boolean;
    permissao: OrcamentoPermissao;
}

export interface AdicionarOrcamentoUsuario {
    idOrcamento: number;
    valorHora: number;
    multiplicador: number;
}

export interface EditarOrcamentoUsuario {
    id: number;
    idOrcamento: number;
    valorHora: number;
    multiplicador: number;
}

interface ReceiveOrcamentoItensAction {
    type: 'RECEIVE_ORCAMENTO_USUARIOS';
    orcamentoUsuarios: OrcamentoUsuario[];
}

interface AdicionarOrcamentoUsuarioAction {
    type: 'ADICIONAR_ORCAMENTO_USUARIO';
    orcamentoUsuario?: OrcamentoUsuario;
}

interface IsLoadingOrcamentoUsuarioAction {
    type: 'IS_LOADING_ORCAMENTO_USUARIO';
    value: boolean;
}

interface SetSearchOrcamentoUsuario {
    type: 'SET_SEARCH_ORCAMENTO_USUARIO';
    value: boolean;
}

type KnownAction = ReceiveOrcamentoItensAction | AdicionarOrcamentoUsuarioAction | IsLoadingOrcamentoUsuarioAction | SetSearchOrcamentoUsuario;

const BASE_URL = "orcamentoUsuarios";

export const actionCreators = {
    requestOrcamentos: (callback: Function, idOrcamento: number): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'IS_LOADING_ORCAMENTO_USUARIO', value: true });

        HTTP.get(`/${BASE_URL}?idOrcamento=${idOrcamento}`)
            .then(response => response.data as Promise<OrcamentoUsuario[]>)
            .then(result => {
                dispatch({ type: 'RECEIVE_ORCAMENTO_USUARIOS', orcamentoUsuarios: result });
                dispatch({ type: 'IS_LOADING_ORCAMENTO_USUARIO', value: false });

                callback();
            }, error => {
                callback(error);
                dispatch({ type: 'IS_LOADING_ORCAMENTO_USUARIO', value: false });
            });
    },

    adicionarUsuario: (data: AdicionarOrcamentoUsuario, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'IS_LOADING_ORCAMENTO_USUARIO', value: true });

        HTTP.post(`/${BASE_URL}`, JSON.stringify(data))
            .then(response => response.data as Promise<OrcamentoUsuario>)
            .then(data => {
                dispatch({ type: 'ADICIONAR_ORCAMENTO_USUARIO', orcamentoUsuario: data });
                dispatch({ type: 'IS_LOADING_ORCAMENTO_USUARIO', value: false });
                callback();
            }, error => {
                callback(error);
                dispatch({ type: 'IS_LOADING_ORCAMENTO_USUARIO', value: false });
            });
    },

    editarUsuario: (id: number, data: EditarOrcamentoUsuario, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'IS_LOADING_ORCAMENTO_USUARIO', value: true });

        HTTP.put(`/${BASE_URL}/${id}`, JSON.stringify(data))
            .then(response => response.data as Promise<OrcamentoUsuario>)
            .then(data => {
                dispatch({ type: 'ADICIONAR_ORCAMENTO_USUARIO', orcamentoUsuario: data });
                dispatch({ type: 'IS_LOADING_ORCAMENTO_USUARIO', value: false });
                callback();
            }, error => {
                callback(error);
                dispatch({ type: 'IS_LOADING_ORCAMENTO_USUARIO', value: false });
            });
    },

    excluirUsuario: (id: number, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'IS_LOADING_ORCAMENTO_USUARIO', value: true });

        HTTP.delete(`/${BASE_URL}/${id}`)
            .then(response => response.data as Promise<OrcamentoUsuario>)
            .then(data => {
                dispatch({ type: 'SET_SEARCH_ORCAMENTO_USUARIO', value: true });
                dispatch({ type: 'IS_LOADING_ORCAMENTO_USUARIO', value: false });
                callback();
            }, error => {
                callback(error);
                dispatch({ type: 'IS_LOADING_ORCAMENTO_USUARIO', value: false });
            });
    },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: OrcamentoUsuarioState = {
    isLoading: false,
    search: true,
};

export const reducer: Reducer<OrcamentoUsuarioState> = (state: OrcamentoUsuarioState | undefined, incomingAction: Action): OrcamentoUsuarioState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'RECEIVE_ORCAMENTO_USUARIOS':
            return {
                ...state,
                orcamentoUsuarios: action.orcamentoUsuarios,
                search: false,
            };
        case 'ADICIONAR_ORCAMENTO_USUARIO':
            return {
                ...state,
                orcamentoUsuario: action.orcamentoUsuario,
                search: true
            }
        case 'IS_LOADING_ORCAMENTO_USUARIO':
            return {
                ...state,
                isLoading: action.value
            }
        case 'SET_SEARCH_ORCAMENTO_USUARIO':
            return {
                ...state,
                search: action.value
            }
        default:
            return state;
    }
};

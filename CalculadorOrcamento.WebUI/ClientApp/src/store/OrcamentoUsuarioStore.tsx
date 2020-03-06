import HTTP from 'http/index';
import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface OrcamentoUsuarioState {
    isLoading: boolean;
    orcamentoUsuarios?: OrcamentoUsuario[];
    orcamentoUsuario?: OrcamentoUsuario;
    search: boolean;
}

export interface OrcamentoUsuario {
    id: number;
    idOrcamento: number;
    valorHora: number;
    multiplicador: number;
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

interface AdicionarOrcamentoItemAction {
    type: 'ADICIONAR_ORCAMENTO_USUARIO';
    orcamentoUsuario?: OrcamentoUsuario;
}

interface IsLoadingOrcamentoItemAction {
    type: 'IS_LOADING_ORCAMENTO_USUARIO';
    value: boolean;
}

interface SetSearchOrcamentoItem {
    type: 'SET_SEARCH_ORCAMENTO_USUARIO';
    value: boolean;
}

type KnownAction = ReceiveOrcamentoItensAction | AdicionarOrcamentoItemAction | IsLoadingOrcamentoItemAction | SetSearchOrcamentoItem;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestOrcamentos: (callback: Function, idOrcamento: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'IS_LOADING_ORCAMENTO_USUARIO', value: true });

        HTTP.get(`/orcamentovalores?idOrcamento=${idOrcamento}`)
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

    adicionarItem: (data: AdicionarOrcamentoUsuario, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'IS_LOADING_ORCAMENTO_USUARIO', value: true });

        HTTP.post(`/orcamentovalores`, JSON.stringify(data))
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

    editarItem: (id: number, data: EditarOrcamentoUsuario, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'IS_LOADING_ORCAMENTO_USUARIO', value: true });

        HTTP.put(`/orcamentovalores/${id}`, JSON.stringify(data))
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

    excluirItem: (id: number, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'IS_LOADING_ORCAMENTO_USUARIO', value: true });

        HTTP.delete(`/orcamentovalores/${id}`)
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

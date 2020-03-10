import HTTP from 'http/index';
import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface OrcamentoValorState {
    isLoading: boolean;
    orcamentoValores?: OrcamentoValor[];
    orcamentoValor?: OrcamentoValor;
    search: boolean;
}

export interface OrcamentoValor {
    id: number;
    idOrcamento: number;
    valorHora: number;
    multiplicador: number;
}

export interface AdicionarOrcamentoValor {
    idOrcamento: number;
    valorHora: number;
    multiplicador: number;
}

export interface EditarOrcamentoValor {
    id: number;
    idOrcamento: number;
    valorHora: number;
    multiplicador: number;
}

interface ReceiveOrcamentoItensAction {
    type: 'RECEIVE_ORCAMENTO_VALORES';
    orcamentoValores: OrcamentoValor[];
}

interface AdicionarOrcamentoItemAction {
    type: 'ADICIONAR_ORCAMENTO_VALOR';
    orcamentoValor?: OrcamentoValor;
}

interface IsLoadingOrcamentoItemAction {
    type: 'IS_LOADING_ORCAMENTO_VALOR';
    value: boolean;
}

interface SetSearchOrcamentoItem {
    type: 'SET_SEARCH_ORCAMENTO_VALOR';
    value: boolean;
}

type KnownAction = ReceiveOrcamentoItensAction | AdicionarOrcamentoItemAction | IsLoadingOrcamentoItemAction | SetSearchOrcamentoItem;

const BASE_URL = "orcamentoValores";

export const actionCreators = {
    requestOrcamentos: (callback: Function, idOrcamento: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'IS_LOADING_ORCAMENTO_VALOR', value: true });

        HTTP.get(`/${BASE_URL}?idOrcamento=${idOrcamento}`)
            .then(response => response.data as Promise<OrcamentoValor[]>)
            .then(result => {
                dispatch({ type: 'RECEIVE_ORCAMENTO_VALORES', orcamentoValores: result });
                dispatch({ type: 'IS_LOADING_ORCAMENTO_VALOR', value: false });

                callback();
            }, error => {
                callback(error);
                dispatch({ type: 'IS_LOADING_ORCAMENTO_VALOR', value: false });
            });
    },

    adicionarItem: (data: AdicionarOrcamentoValor, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'IS_LOADING_ORCAMENTO_VALOR', value: true });

        HTTP.post(`/${BASE_URL}`, JSON.stringify(data))
            .then(response => response.data as Promise<OrcamentoValor>)
            .then(data => {
                dispatch({ type: 'ADICIONAR_ORCAMENTO_VALOR', orcamentoValor: data });
                dispatch({ type: 'IS_LOADING_ORCAMENTO_VALOR', value: false });
                callback();
            }, error => {
                callback(error);
                dispatch({ type: 'IS_LOADING_ORCAMENTO_VALOR', value: false });
            });
    },

    editarItem: (id: number, data: EditarOrcamentoValor, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'IS_LOADING_ORCAMENTO_VALOR', value: true });

        HTTP.put(`/${BASE_URL}/${id}`, JSON.stringify(data))
            .then(response => response.data as Promise<OrcamentoValor>)
            .then(data => {
                dispatch({ type: 'ADICIONAR_ORCAMENTO_VALOR', orcamentoValor: data });
                dispatch({ type: 'IS_LOADING_ORCAMENTO_VALOR', value: false });
                callback();
            }, error => {
                callback(error);
                dispatch({ type: 'IS_LOADING_ORCAMENTO_VALOR', value: false });
            });
    },

    excluirItem: (id: number, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'IS_LOADING_ORCAMENTO_VALOR', value: true });

        HTTP.delete(`/${BASE_URL}/${id}`)
            .then(response => response.data as Promise<OrcamentoValor>)
            .then(data => {
                dispatch({ type: 'SET_SEARCH_ORCAMENTO_VALOR', value: true });
                dispatch({ type: 'IS_LOADING_ORCAMENTO_VALOR', value: false });
                callback();
            }, error => {
                callback(error);
                dispatch({ type: 'IS_LOADING_ORCAMENTO_VALOR', value: false });
            });
    },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: OrcamentoValorState = {
    isLoading: false,
    search: true,
};

export const reducer: Reducer<OrcamentoValorState> = (state: OrcamentoValorState | undefined, incomingAction: Action): OrcamentoValorState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'RECEIVE_ORCAMENTO_VALORES':
            return {
                ...state,
                orcamentoValores: action.orcamentoValores,
                search: false,
            };
        case 'ADICIONAR_ORCAMENTO_VALOR':
            return {
                ...state,
                orcamentoValor: action.orcamentoValor,
                search: true
            }
        case 'IS_LOADING_ORCAMENTO_VALOR':
            return {
                ...state,
                isLoading: action.value
            }
        case 'SET_SEARCH_ORCAMENTO_VALOR':
            return {
                ...state,
                search: action.value
            }
        default:
            return state;
    }
};

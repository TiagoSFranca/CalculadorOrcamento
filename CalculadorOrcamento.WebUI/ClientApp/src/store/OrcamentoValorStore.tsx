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
    orcamentoItens: OrcamentoValor[];
}

interface AdicionarOrcamentoItemAction {
    type: 'ADICIONAR_ORCAMENTO_VALOR';
    orcamentoItem?: OrcamentoValor;
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

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestOrcamentos: (callback: Function, idOrcamento: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'IS_LOADING_ORCAMENTO_VALOR', value: true });

        HTTP.get(`/orcamentovalores?idOrcamento=${idOrcamento}`)
            .then(response => response.data as Promise<OrcamentoValor[]>)
            .then(result => {
                dispatch({ type: 'RECEIVE_ORCAMENTO_VALORES', orcamentoItens: result });
                dispatch({ type: 'IS_LOADING_ORCAMENTO_VALOR', value: false });

                callback();
            }, error => {
                callback(error);
                dispatch({ type: 'IS_LOADING_ORCAMENTO_VALOR', value: false });
            });
    },

    adicionarItem: (data: AdicionarOrcamentoValor, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'IS_LOADING_ORCAMENTO_VALOR', value: true });

        HTTP.post(`/orcamentovalores`, JSON.stringify(data))
            .then(response => response.data as Promise<OrcamentoValor>)
            .then(data => {
                dispatch({ type: 'ADICIONAR_ORCAMENTO_VALOR', orcamentoItem: data });
                dispatch({ type: 'IS_LOADING_ORCAMENTO_VALOR', value: false });
                callback();
            }, error => {
                callback(error);
                dispatch({ type: 'IS_LOADING_ORCAMENTO_VALOR', value: false });
            });
    },

    editarItem: (id: number, data: EditarOrcamentoValor, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'IS_LOADING_ORCAMENTO_VALOR', value: true });

        HTTP.put(`/orcamentovalores/${id}`, JSON.stringify(data))
            .then(response => response.data as Promise<OrcamentoValor>)
            .then(data => {
                dispatch({ type: 'ADICIONAR_ORCAMENTO_VALOR', orcamentoItem: data });
                dispatch({ type: 'IS_LOADING_ORCAMENTO_VALOR', value: false });
                callback();
            }, error => {
                callback(error);
                dispatch({ type: 'IS_LOADING_ORCAMENTO_VALOR', value: false });
            });
    },

    excluirItem: (id: number, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'IS_LOADING_ORCAMENTO_VALOR', value: true });

        HTTP.delete(`/orcamentovalores/${id}`)
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
                orcamentoValores: action.orcamentoItens,
                search: false,
            };
        case 'ADICIONAR_ORCAMENTO_VALOR':
            return {
                ...state,
                orcamentoValor: action.orcamentoItem,
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

import HTTP from 'http/index';
import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface OrcamentoItemAplicacaoState {
    isLoading: boolean;
    orcamentoItens?: OrcamentoItemAplicacao[];
    orcamentoItem?: OrcamentoItemAplicacao;
    search: boolean;
    editarTabPrev: number;
    editarTabAct: number;
}

export interface OrcamentoItemAplicacao {
    id: number;
    idOrcamento: number;
    codigo: string;
    nome: string;
    descricao: string;
    observacao: string;
    dataCriacao: string;
    dataAtualizacao: string;
    duracaoBack?: number;
    duracaoFront?: number;
    duracaoTotal?: number;
}

export interface AdicionarOrcamentoItem {
    idOrcamento: number;
    nome: string;
    descricao?: string;
    observavao?: string;
    duracaoBack?: number;
    duracaoFront?: number;
    duracaoTotal?: number;
}

export interface EditarOrcamentoItem {
    id: number;
    idOrcamento: number;
    nome: string;
    descricao?: string;
    observavao?: string;
    duracaoBack?: number;
    duracaoFront?: number;
    duracaoTotal?: number;
}

interface ReceiveOrcamentoItensAction {
    type: 'RECEIVE_ORCAMENTOS';
    orcamentoItens: OrcamentoItemAplicacao[];
}

interface AdicionarOrcamentoItemAction {
    type: 'ADICIONAR_ORCAMENTO';
    orcamentoItem?: OrcamentoItemAplicacao;
}

interface IsLoadingOrcamentoItemAction {
    type: 'IS_LOADING_ORCAMENTO';
    value: boolean;
}

interface SetSearchOrcamentoItem {
    type: 'SET_SEARCH_ORCAMENTO';
    value: boolean;
}

type KnownAction = ReceiveOrcamentoItensAction | AdicionarOrcamentoItemAction | IsLoadingOrcamentoItemAction | SetSearchOrcamentoItem;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestOrcamentos: (callback: Function, idOrcamento: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'IS_LOADING_ORCAMENTO', value: true });

        HTTP.get(`/orcamentoitensaplicacao?idOrcamento=${idOrcamento}`)
            .then(response => response.data as Promise<OrcamentoItemAplicacao[]>)
            .then(result => {
                dispatch({ type: 'RECEIVE_ORCAMENTOS', orcamentoItens: result });
                dispatch({ type: 'IS_LOADING_ORCAMENTO', value: false });

                callback();
            }, error => {
                callback(error);
                dispatch({ type: 'IS_LOADING_ORCAMENTO', value: false });
            });
    },

    adicionarItem: (data: AdicionarOrcamentoItem, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'IS_LOADING_ORCAMENTO', value: true });

        HTTP.post(`/orcamentoitensaplicacao`, JSON.stringify(data))
            .then(response => response.data as Promise<OrcamentoItemAplicacao>)
            .then(data => {
                dispatch({ type: 'ADICIONAR_ORCAMENTO', orcamentoItem: data });
                dispatch({ type: 'IS_LOADING_ORCAMENTO', value: false });
                callback();
            }, error => {
                callback(error);
                dispatch({ type: 'IS_LOADING_ORCAMENTO', value: false });
            });
    },

    editarItem: (id: number, data: EditarOrcamentoItem, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'IS_LOADING_ORCAMENTO', value: true });

        HTTP.put(`/orcamentoitensaplicacao/${id}`, JSON.stringify(data))
            .then(response => response.data as Promise<OrcamentoItemAplicacao>)
            .then(data => {
                dispatch({ type: 'ADICIONAR_ORCAMENTO', orcamentoItem: data });
                dispatch({ type: 'IS_LOADING_ORCAMENTO', value: false });
                callback();
            }, error => {
                callback(error);
                dispatch({ type: 'IS_LOADING_ORCAMENTO', value: false });
            });
    },

    excluirItem: (id: number, callback: Function): AppThunkAction<KnownAction> => (dispatch) => {
        dispatch({ type: 'IS_LOADING_ORCAMENTO', value: true });

        HTTP.delete(`/orcamentoitensaplicacao/${id}`)
            .then(response => response.data as Promise<OrcamentoItemAplicacao>)
            .then(data => {
                dispatch({ type: 'SET_SEARCH_ORCAMENTO', value: true });
                dispatch({ type: 'IS_LOADING_ORCAMENTO', value: false });
                callback();
            }, error => {
                callback(error);
                dispatch({ type: 'IS_LOADING_ORCAMENTO', value: false });
            });
    },
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: OrcamentoItemAplicacaoState = {
    isLoading: false,
    search: true,
    editarTabPrev: 0,
    editarTabAct: 0,
};

export const reducer: Reducer<OrcamentoItemAplicacaoState> = (state: OrcamentoItemAplicacaoState | undefined, incomingAction: Action): OrcamentoItemAplicacaoState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'RECEIVE_ORCAMENTOS':
            return {
                ...state,
                orcamentoItens: action.orcamentoItens,
                search: false,
            };
        case 'ADICIONAR_ORCAMENTO':
            return {
                ...state,
                orcamentoItem: action.orcamentoItem,
                search: true
            }
        case 'IS_LOADING_ORCAMENTO':
            return {
                ...state,
                isLoading: action.value
            }
        case 'SET_SEARCH_ORCAMENTO':
            return {
                ...state,
                search: action.value
            }
        default:
            return state;
    }
};
